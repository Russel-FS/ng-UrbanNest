import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [class]="status">
      {{status}}
    </span>
  `,
  styles: [`
    .badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status: string = 'pending';
}
