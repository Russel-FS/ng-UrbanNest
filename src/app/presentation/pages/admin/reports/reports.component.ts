import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  imports: [CommonModule, FormsModule],
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .animate-fade-in {
      animation: fadeIn 0.5s ease-out;
    }

    .animate-slide-up {
      animation: slideUp 0.5s ease-out;
    }
  `]
})
export class ReportsComponent {
  reportTypes = [
    { id: 'properties', name: 'Propiedades' },
    { id: 'agents', name: 'Agentes' },
    { id: 'reviews', name: 'Revisiones' },
  ];

  selectedReport = 'properties';
  dateRange = {
    start: new Date(),
    end: new Date(),
  };

  isLoading = false;

  async generateReport() {
    this.isLoading = true;
    try {
      // Simular carga
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } finally {
      this.isLoading = false;
    }
  }

  async exportReport() {
    this.isLoading = true;
    try {
      // Simular carga
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      this.isLoading = false;
    }
  }
}
