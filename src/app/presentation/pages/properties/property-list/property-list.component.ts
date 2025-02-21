import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PropertyCardComponent } from '../../../shared/components/property-card/property-card.component';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
  imports: [CommonModule, PropertyCardComponent],
})
export class PropertyListComponent {
  properties: any[] = [];
  filterOptions = {
    status: 'all',
    type: 'all',
    price: { min: 0, max: 999999 }
  };
}
