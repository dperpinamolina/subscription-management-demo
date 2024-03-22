import { Component, ViewChild } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  IGX_ACTION_STRIP_DIRECTIVES,
  IGX_DIALOG_DIRECTIVES,
  IGX_GRID_DIRECTIVES,
  IgxButtonDirective,
  IgxDialogComponent,
  IgxIconComponent,
} from 'igniteui-angular';
import { AddComponent } from './add/add.component';
import { FilterComponent } from './filter/filter.component';
import {
  Subscription,
  SubscriptionFilter,
  definedSubscriptions,
} from './subscription-management.model';
dayjs.extend(customParseFormat);

@Component({
  selector: 'app-subscription-management',
  standalone: true,
  imports: [
    IGX_GRID_DIRECTIVES,
    IgxButtonDirective,
    IgxIconComponent,
    IGX_ACTION_STRIP_DIRECTIVES,
    IGX_DIALOG_DIRECTIVES,
    AddComponent,
    FilterComponent,
  ],
  templateUrl: './subscription-management.component.html',
  styleUrl: './subscription-management.component.scss',
})
export class SubscriptionManagementComponent {
  @ViewChild('addDialog', { read: IgxDialogComponent, static: true })
  addDialog!: IgxDialogComponent;

  subscriptions: Array<Subscription> = [...definedSubscriptions];

  filterSubscriptions = [...this.subscriptions];

  delete(id: number) {
    console.log(id);
    this.subscriptions = this.subscriptions.filter(
      (s) => s.id !== id
    );
    this.filterSubscriptions = [...this.subscriptions];
  }

  submitFilter(filters: SubscriptionFilter) {
    const { windfarms, devices, resolution, signals, fromTo } = filters;

    const filterStartDate = dayjs(new Date(fromTo.start));
    const filterEndDate = dayjs(new Date(fromTo.end));
    this.filterSubscriptions = this.subscriptions.filter((s) => {
      return (
        (!windfarms.length || this.windfarmsFilter(windfarms, s.windfarms)) &&
        (!devices.length || this.devicesFilter(devices, s.signals)) &&
        (!signals.length || this.resolutionsFilter(signals, s.signals)) &&
        (!resolution.length || this.signalsFilter(resolution, s.windfarms)) &&
        this.datesFilter(
          filterStartDate,
          filterEndDate,
          dayjs(s.from, 'DD-MM-YYYY'),
          dayjs(s.to, 'DD-MM-YYYY')
        )
      );
    });
  }

  onAddSubscriptionClicked(sub: Array<Subscription>) {
    sub.forEach((s) =>
      this.subscriptions.push(s)
    );

    this.filterSubscriptions = [...this.subscriptions];
    this.addDialog.close();
  }

  private datesFilter = (
    filterStartDate: Dayjs,
    filterEndDate: Dayjs,
    subscriptionStartDate: Dayjs,
    subscriptionEndDate: Dayjs
  ): Boolean =>
    subscriptionStartDate.isAfter(filterStartDate) &&
    subscriptionEndDate.isBefore(filterEndDate);

  private windfarmsFilter = (
    filter: Array<string>,
    wf: string
  ): boolean => filter.includes(wf);

  private devicesFilter = (filter: Array<string>, device: string): boolean =>
    filter.includes(device);

  private resolutionsFilter = (filter: Array<string>, res: string): boolean =>
    filter.includes(res);

  private signalsFilter = (filter: Array<string>, signal: string): boolean =>
    filter.includes(signal);
}
