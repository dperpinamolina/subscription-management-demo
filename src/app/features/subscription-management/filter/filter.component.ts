import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  IGX_ACTION_STRIP_DIRECTIVES,
  IGX_COMBO_DIRECTIVES,
  IGX_DATE_RANGE_PICKER_DIRECTIVES,
  IgxButtonDirective,
} from 'igniteui-angular';
import {
  SubscriptionFilter,
  definedDevices,
  definedResolutions,
  definedSignals,
  definedWindfarms,
} from '../subscription-management.model';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    IgxButtonDirective,
    IGX_ACTION_STRIP_DIRECTIVES,
    IGX_COMBO_DIRECTIVES,
    IGX_DATE_RANGE_PICKER_DIRECTIVES,
    ReactiveFormsModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Output()
  submitFilter = new EventEmitter<SubscriptionFilter>();

  windfarms = [...definedWindfarms];
  signals = [...definedSignals];
  devices = [...definedDevices];
  resolutions = [...definedResolutions];

  filtersForm = inject(FormBuilder).nonNullable.group({
    windfarms: [[]],
    devices: [[]],
    resolution: [[]],
    signals: [[]],
    fromTo: [{ start: new Date(2024, 2, 10), end: new Date(2024, 3, 10) }],
  });
}
