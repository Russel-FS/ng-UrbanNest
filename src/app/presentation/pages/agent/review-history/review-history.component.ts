import { Component } from '@angular/core';

@Component({
  selector: 'app-review-history',
  templateUrl: './review-history.component.html',
  styleUrls: ['./review-history.component.scss']
})
export class ReviewHistoryComponent {
  reviewHistory = [];
  filterOptions = {
    startDate: null,
    endDate: null,
    status: 'all'
  };

  filterReviews() {
    // Lógica para filtrar revisiones
  }

  exportReport() {
    // Lógica para exportar reporte
  }
}
