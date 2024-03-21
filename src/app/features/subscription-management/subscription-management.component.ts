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

  readonly subscriptions: Array<Subscription> = [...definedSubscriptions];

  filterSubscriptions = [...this.subscriptions];

  delete(windfarms: string) {
    this.filterSubscriptions = this.subscriptions.filter(
      (s) => s.windfarms !== windfarms
    );
  }

  submitFilter(filters: SubscriptionFilter) {
    const { windfarms, signals, fromTo } = filters;

    const filterStartDate = dayjs(new Date(fromTo.start));
    const filterEndDate = dayjs(new Date(fromTo.end));
    this.filterSubscriptions = this.subscriptions.filter((s) => {
      return this.datesFilter(
        filterStartDate,
        filterEndDate,
        dayjs(s.from, 'DD-MM-YYYY'),
        dayjs(s.to, 'DD-MM-YYYY')
      );
    });
  }

  onAddSubscriptionClicked(sub: Array<Subscription>) {
    sub.forEach((s) =>
      this.subscriptions.push({
        ...s,
        from: dayjs(s.from).format('DD/MM/YYYY mm:ss'),
        to: dayjs(s.to).format('DD/MM/YYYY mm:ss'),
      })
    );

    this.filterSubscriptions = [...this.subscriptions];
    this.addDialog.close();
  }

  private datesFilter(
    filterStartDate: Dayjs,
    filterEndDate: Dayjs,
    subscriptionStartDate: Dayjs,
    subscriptionEndDate: Dayjs
  ) {
    return (
      subscriptionStartDate.isAfter(filterStartDate) &&
      subscriptionEndDate.isBefore(filterEndDate)
    );
  }
}
