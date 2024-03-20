import { NgForOf, NgIf } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import {
  IGX_ACTION_STRIP_DIRECTIVES,
  IGX_DATE_RANGE_PICKER_DIRECTIVES,
  IGX_DIALOG_DIRECTIVES,
  IGX_GRID_DIRECTIVES,
  IGX_INPUT_GROUP_DIRECTIVES,
  IGX_SELECT_DIRECTIVES,
  IgxButtonDirective,
  IgxDialogComponent,
  IgxIconComponent,
} from 'igniteui-angular';
import { AddComponent } from './add/add.component';

export const definedSignals = [
  'Wind speed low start condition',
  'Yaw wind speed low yaw enable',
  'WTG system ok',
  'Pit ALU container level L warn',
];

export const definedFQSN = ['ES-123874', 'IT-872349', 'EN-123830', 'AU-123822'];

export type Subscription = {
  windfarms: string;
  devices: string;
  resolution: string;
  signals: string;
  from: string;
  to: string;
};

@Component({
  selector: 'app-subscription-management',
  standalone: true,
  imports: [
    IGX_GRID_DIRECTIVES,
    IgxButtonDirective,
    IgxIconComponent,
    IGX_ACTION_STRIP_DIRECTIVES,
    IGX_INPUT_GROUP_DIRECTIVES,
    IGX_SELECT_DIRECTIVES,
    IGX_DIALOG_DIRECTIVES,
    IGX_DATE_RANGE_PICKER_DIRECTIVES,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    AddComponent,
  ],
  templateUrl: './subscription-management.component.html',
  styleUrl: './subscription-management.component.scss',
})
export class SubscriptionManagementComponent {
  @ViewChild('addDialog', { read: IgxDialogComponent, static: true })
  addDialog!: IgxDialogComponent;

  signals = [...definedSignals];

  filtersForm = inject(FormBuilder).nonNullable.group({
    fqsn: [''],
    signals: [''],
    fromTo: [{ start: new Date(2024, 2, 10), end: new Date(2024, 2, 25) }],
  });

  readonly subscriptions: Array<Subscription> = [
    {
      windfarms: 'ES-1239809',
      signals: this.signals[0],
      from: '11/02/2024',
      to: '15/02/2024',
      devices: 'asset1',
      resolution: 'resolution1',
    },
    {
      windfarms: 'ES-6578809',
      signals: this.signals[1],
      from: '11/02/2024',
      to: '17/02/2024',
      devices: 'asset1',
      resolution: 'resolution1',
    },
    {
      windfarms: 'RU-1222209',
      signals: this.signals[2],
      from: '11/02/2024',
      to: '29/02/2024',
      devices: 'asset1',
      resolution: 'resolution1',
    },
    {
      windfarms: 'EN-1111809',
      signals: this.signals[3],
      from: '02/02/2024',
      to: '20/02/2024',
      devices: 'asset1',
      resolution: 'resolution1',
    },
  ];

  filterSubscriptions = [...this.subscriptions];

  submitFilter() {
    const { fqsn, signals, fromTo } = this.filtersForm.getRawValue();

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
        (!fqsn || s.windfarms.includes(fqsn)) &&
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

/**
 *
 * todo combos, seleccion en cascada
 * preview antes de confirmar
 * FQSN -- Assets
 * Windfarms new column priemra columna - device - signals
 * nuevo filtro para windfarm
 *
 * actionstrip -- view y delete
 *
 * parque (combo)
 * device (combo)
 * resolution (select)
 * signals (combo)
 *
 */
