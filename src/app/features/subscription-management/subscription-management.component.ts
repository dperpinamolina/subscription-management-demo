import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import {
  IGX_ACTION_STRIP_DIRECTIVES,
  IGX_COMBO_DIRECTIVES,
  IGX_DATE_RANGE_PICKER_DIRECTIVES,
  IGX_DIALOG_DIRECTIVES,
  IGX_GRID_DIRECTIVES,
  IgxButtonDirective,
  IgxDialogComponent,
  IgxIconComponent,
} from 'igniteui-angular';
import { AddComponent } from './add/add.component';
import {
  Subscription,
  definedDevices,
  definedResolutions,
  definedSignals,
  definedSubscriptions,
  definedWindfarms,
} from './subscription-management.model';

@Component({
  selector: 'app-subscription-management',
  standalone: true,
  imports: [
    IGX_GRID_DIRECTIVES,
    IgxButtonDirective,
    IgxIconComponent,
    IGX_ACTION_STRIP_DIRECTIVES,
    IGX_COMBO_DIRECTIVES,
    IGX_DIALOG_DIRECTIVES,
    IGX_DATE_RANGE_PICKER_DIRECTIVES,
    ReactiveFormsModule,
    AddComponent,
  ],
  templateUrl: './subscription-management.component.html',
  styleUrl: './subscription-management.component.scss',
})
export class SubscriptionManagementComponent {
  @ViewChild('addDialog', { read: IgxDialogComponent, static: true })
  addDialog!: IgxDialogComponent;

  windfarms = [...definedWindfarms];
  signals = [...definedSignals];
  devices = [...definedDevices];
  resolutions = [...definedResolutions];
  readonly subscriptions: Array<Subscription> = [...definedSubscriptions];

  filtersForm = inject(FormBuilder).nonNullable.group({
    windfarms: [[]],
    devices: [[]],
    resolution: [[]],
    signals: [[]],
    fromTo: [{ start: new Date(2024, 2, 10), end: new Date(2024, 2, 25) }],
  });

  filterSubscriptions = [...this.subscriptions];

  delete(windfarms: string) {
    this.filterSubscriptions = this.subscriptions.filter((s) => s.windfarms !== windfarms);
  }

  submitFilter() {
    const { windfarms, signals, fromTo } = this.filtersForm.getRawValue();

    const startDate = dayjs(fromTo.start);
    const endDate = dayjs(fromTo.end);

    this.filterSubscriptions = this.subscriptions.filter((s) => {
      const subscriptionStartDate = dayjs(s.from, 'DD/MM/YYYY mm:ss');
      const subscriptionEndDate = dayjs(s.to, 'DD/MM/YYYY mm:ss');

      console.log(
        'Subscription Start Date:',
        subscriptionStartDate.format('DD/MM/YYYY mm:ss')
      );
      console.log(
        'Subscription End Date:',
        subscriptionEndDate.format('DD/MM/YYYY mm:ss')
      );

      console.log(
        'Start Date is before Subscription End Date:',
        startDate.isBefore(subscriptionStartDate)
      );
      console.log(
        'End Date is after Subscription Start Date:',
        endDate.isAfter(subscriptionEndDate)
      );

      return (
        startDate.isBefore(subscriptionStartDate) &&
        endDate.isAfter(subscriptionEndDate) &&
        (!windfarms || s.windfarms.includes(windfarms)) &&
        (!signals || s.signals === signals)
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
}
