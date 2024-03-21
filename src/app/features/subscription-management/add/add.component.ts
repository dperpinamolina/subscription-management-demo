import { NgForOf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import dayjs from 'dayjs';
import {
  IGX_COMBO_DIRECTIVES,
  IGX_DIALOG_DIRECTIVES,
  IGX_INPUT_GROUP_DIRECTIVES,
  IGX_SELECT_DIRECTIVES,
  IgxDateTimeEditorModule,
  IgxDialogComponent,
} from 'igniteui-angular';
import {
  Subscription,
  definedDevices,
  definedResolutions,
  definedSignals,
  definedWindfarms,
} from '../subscription-management.model';
import { PreviewComponent } from './preview/preview.component';

type FormRawValue = {
  windfarms: Array<string>;
  devices: Array<string>;
  resolution: string;
  signals: Array<string>;
  from: string;
  to: string;
};

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    IGX_DIALOG_DIRECTIVES,
    IGX_INPUT_GROUP_DIRECTIVES,
    IGX_SELECT_DIRECTIVES,
    IGX_COMBO_DIRECTIVES,
    IgxDateTimeEditorModule,
    ReactiveFormsModule,
    NgForOf,
    PreviewComponent,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  @ViewChild('previewDialog', { read: IgxDialogComponent, static: true })
  previewDialog!: IgxDialogComponent;

  @Output()
  addButtonClicked = new EventEmitter<Array<Subscription>>();

  @Output()
  cancelButtonClicked = new EventEmitter();

  @Output()
  cancelPreviewButtonClicked = new EventEmitter();

  windfarms = [...definedWindfarms];
  signals = [...definedSignals];
  devices = [...definedDevices];
  resolutions = [...definedResolutions];

  form = inject(FormBuilder).nonNullable.group({
    windfarms: [[], Validators.required],
    devices: [
      { value: [] as Array<string>, disabled: true },
      Validators.required,
    ],
    resolution: [{ value: '', disabled: true }, Validators.required],
    signals: [
      { value: [] as Array<string>, disabled: true },
      Validators.required,
    ],
    to: ['', Validators.required],
    from: ['', Validators.required],
  });

  addedSubscritions: Array<Subscription> = [];

  constructor() {
    this.validControlWindfarms();
    this.validControlDevices();
    this.validControlResolution();
  }

  validControlWindfarms() {
    this.form.controls['windfarms'].valueChanges.subscribe(
      (v: Array<string>) => {
        if (v.length > 0) {
          this.form.controls['devices'].enable();
        } else {
          this.form.controls['devices'].disable();
        }
        this.form.controls['devices'].reset();
        this.form.controls['resolution'].reset();
        this.form.controls['resolution'].disable();
        this.form.controls['signals'].reset();
        this.form.controls['signals'].disable();
      }
    );
  }

  validControlDevices() {
    this.form.controls['devices'].valueChanges.subscribe((v: Array<string>) => {
      if (v.length > 0) {
        this.form.controls['resolution'].enable();
      } else {
        this.form.controls['resolution'].disable();
      }
      this.form.controls['resolution'].reset();
      this.form.controls['signals'].reset();
      this.form.controls['signals'].disable();
    });
  }

  validControlResolution() {
    this.form.controls['resolution'].valueChanges.subscribe((v: string) => {
      if (v) {
        this.form.controls['signals'].enable();
      } else {
        this.form.controls['signals'].disable();
      }
      this.form.controls['signals'].reset();
    });
  }

  onPreviewButtonClicked() {
    this.cancelButtonClicked.emit();
    this.previewDialog.open();
  }

  onPreviewCancelButtonClicked() {
    this.previewDialog.close();
    this.cancelPreviewButtonClicked.emit();
  }

  onPreviewAcceptButtonClicked() {
    this.previewDialog.close();
    this.addButtonClicked.emit(this.addedSubscritions);
    this.form.reset();
  }

  onAddButtonClicked() {
    this.addedSubscritions = this.transformSubscriptionAddedToSubscription(
      this.form.getRawValue()
    );
    this.addButtonClicked.emit(this.addedSubscritions);
    this.form.reset();
  }

  onCancelButtonClicked() {
    this.form.reset();
    this.cancelButtonClicked.emit();
  }

  private transformSubscriptionAddedToSubscription = (
    formRawValue: FormRawValue
  ): Subscription[] =>
    formRawValue.windfarms.flatMap((windfarm) =>
      formRawValue.devices.flatMap((device) =>
        formRawValue.signals.map((signal) => ({
          windfarms: windfarm,
          devices: device,
          resolution: formRawValue.resolution,
          signals: signal,
          from: dayjs(formRawValue.from).format('DD/MM/YYYY mm:ss'),
          to: dayjs(formRawValue.from).format('DD/MM/YYYY mm:ss'),
        }))
      )
    );
}
