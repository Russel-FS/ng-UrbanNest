import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-review',
  templateUrl: './property-review.component.html',
  styleUrls: ['./property-review.component.css'],
  imports: [CommonModule,FormsModule]
})
export class PropertyReviewComponent {
  reviewCriteria = [
    { id: 'info', label: 'Información Completa', checked: false },
    { id: 'photos', label: 'Calidad de Fotos', checked: false },
    { id: 'docs', label: 'Documentación Legal', checked: false }
  ];

  submitReview() {
    // Lógica para enviar la revisión
  }
}
