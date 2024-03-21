import { Component, ViewChild } from '@angular/core';
import dayjs from 'dayjs';
import {
  IGX_ACTION_STRIP_DIRECTIVES,
  IGX_DIALOG_DIRECTIVES,
  IGX_GRID_DIRECTIVES,
  IgxButtonDirective,
  IgxDialogComponent,
  IgxIconComponent
} from 'igniteui-angular';
import { AddComponent } from './add/add.component';
import { FilterComponent } from './filter/filter.component';
import {
  Subscription,
  SubscriptionFilter,
  definedSubscriptions
} from './subscription-management.model';

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
    FilterComponent
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
    this.filterSubscriptions = this.subscriptions.filter((s) => s.windfarms !== windfarms);
  }

  submitFilter(filters: SubscriptionFilter) {
    console.log(filters);
    const { windfarms, signals, fromTo } = filters;

    const startDate = dayjs(fromTo.start);
    const endDate = dayjs(fromTo.end);

    // this.filterSubscriptions = this.subscriptions.filter((s) => {
    //   const subscriptionStartDate = dayjs(s.from, 'DD/MM/YYYY mm:ss');
    //   const subscriptionEndDate = dayjs(s.to, 'DD/MM/YYYY mm:ss');

    //   console.log(
    //     'Subscription Start Date:',
    //     subscriptionStartDate.format('DD/MM/YYYY mm:ss')
    //   );
    //   console.log(
    //     'Subscription End Date:',
    //     subscriptionEndDate.format('DD/MM/YYYY mm:ss')
    //   );

    //   console.log(
    //     'Start Date is before Subscription End Date:',
    //     startDate.isBefore(subscriptionStartDate)
    //   );
    //   console.log(
    //     'End Date is after Subscription Start Date:',
    //     endDate.isAfter(subscriptionEndDate)
    //   );

    //   // return (
    //   //   startDate.isBefore(subscriptionStartDate) &&
    //   //   endDate.isAfter(subscriptionEndDate) &&
    //   //   (!windfarms || s.windfarms.includes(windfarms)) &&
    //   //   (!signals || s.signals === signals)
    //   // );
    // });
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
