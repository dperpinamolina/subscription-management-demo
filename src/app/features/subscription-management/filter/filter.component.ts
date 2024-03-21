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
    devices: [{ value: [] as Array<string>, disabled: true }],
    resolution: [{ value: '', disabled: true }],
    signals: [{ value: [] as Array<string>, disabled: true }],
    fromTo: [{ start: new Date(2024, 2, 10), end: new Date(2024, 3, 10) }],
  });

  constructor() {
    this.validControlWindfarms();
    this.validControlDevices();
    this.validControlResolution();
  }

  validControlWindfarms() {
    this.filtersForm.controls['windfarms'].valueChanges.subscribe(
      (v: Array<string>) => {
        if (v.length > 0) {
          this.filtersForm.controls['devices'].enable();
        } else {
          this.filtersForm.controls['devices'].disable();
        }
        this.filtersForm.controls['devices'].reset();
        this.filtersForm.controls['resolution'].reset();
        this.filtersForm.controls['resolution'].disable();
        this.filtersForm.controls['signals'].reset();
        this.filtersForm.controls['signals'].disable();
      }
    );
  }

  validControlDevices() {
    this.filtersForm.controls['devices'].valueChanges.subscribe((v: Array<string>) => {
      if (v.length > 0) {
        this.filtersForm.controls['resolution'].enable();
      } else {
        this.filtersForm.controls['resolution'].disable();
      }
      this.filtersForm.controls['resolution'].reset();
      this.filtersForm.controls['signals'].reset();
      this.filtersForm.controls['signals'].disable();
    });
  }

  validControlResolution() {
    this.filtersForm.controls['resolution'].valueChanges.subscribe((v: string) => {
      if (v) {
        this.filtersForm.controls['signals'].enable();
      } else {
        this.filtersForm.controls['signals'].disable();
      }
      this.filtersForm.controls['signals'].reset();
    });
  }
}
