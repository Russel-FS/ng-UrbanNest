import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  imports: [CommonModule,FormsModule]
})
export class ReportsComponent {
  reportTypes = [
    { id: 'properties', name: 'Propiedades' },
    { id: 'agents', name: 'Agentes' },
    { id: 'reviews', name: 'Revisiones' }
  ];

  selectedReport = 'properties';
  dateRange = {
    start: new Date(),
    end: new Date()
  };

  generateReport() {
    // Lógica para generar reporte
  }

  exportReport() {
    // Lógica para exportar reporte
  }
}
