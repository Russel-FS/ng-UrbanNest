import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent],
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('0.3s', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
  ],
})
export class PropertyCardComponent {
  @Input() property: any;
  @Input() viewMode: 'grid' | 'list' = 'grid';

  get isGridView(): boolean {
    return this.viewMode === 'grid';
  }
}
