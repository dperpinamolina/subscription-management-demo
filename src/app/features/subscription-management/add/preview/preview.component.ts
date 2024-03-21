import { Component, Input } from '@angular/core';
import { IGX_GRID_DIRECTIVES, IgxIconComponent } from 'igniteui-angular';
import { Subscription } from '../../subscription-management.model';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [IGX_GRID_DIRECTIVES, IgxIconComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent {
  @Input()
  subscriptions: Array<Subscription> = [];
}
