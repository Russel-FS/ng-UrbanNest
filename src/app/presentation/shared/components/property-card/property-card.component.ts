import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent],
  templateUrl: './property-card.component.html',
  styles: [`
    :host {
      display: block;
    }

    .property-card {
      transition: all 0.3s ease;
    }

    .property-card:hover {
      transform: translateY(-8px);
    }
  `]
})
export class PropertyCardComponent {
  @Input() property: any;
  @Input() viewMode: 'grid' | 'list' = 'grid';

  get isGridView(): boolean {
    return this.viewMode === 'grid';
  }
}
