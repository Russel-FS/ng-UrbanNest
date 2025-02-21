import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Review {
  id: string;
  propertyName: string;
  propertyId: string;
  reviewDate: Date;
  status: 'approved' | 'rejected' | 'pending';
  reviewerId: string;
  reviewerName: string;
  comments: string;
  criteria: {
    basic: boolean;
    legal: boolean;
    quality: boolean;
  };
}

@Component({
  selector: 'app-review-history',
  templateUrl: './review-history.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out;
    }
  `]
})
export class ReviewHistoryComponent {
  reviewHistory: Review[] = [
    {
      id: '1',
      propertyName: 'Casa Moderna Centro',
      propertyId: 'PROP001',
      reviewDate: new Date('2024-01-15'),
      status: 'approved',
      reviewerId: 'REV001',
      reviewerName: 'jose perez',
      comments: 'Excelente presentación, cumple todos los criterios',
      criteria: {
        basic: true,
        legal: true,
        quality: true
      }
    },
    {
      id: '2',
      propertyName: 'Apartamento',
      propertyId: 'PROP002',
      reviewDate: new Date('2024-01-10'),
      status: 'rejected',
      reviewerId: 'REV002',
      reviewerName: 'flores solano',
      comments: 'Falta documentación legal',
      criteria: {
        basic: true,
        legal: false,
        quality: true
      }
    }
  ];

  filterOptions = {
    startDate: new Date(),
    endDate: new Date(),
    status: 'all'
  };

  isLoading = false;

  statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'approved', label: 'Aprobados' },
    { value: 'rejected', label: 'Rechazados' },
    { value: 'pending', label: 'Pendientes' }
  ];

  async filterReviews() {
    this.isLoading = true;
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Aquí iría la lógica real de filtrado
    } finally {
      this.isLoading = false;
    }
  }

  async exportReport() {
    this.isLoading = true;
    try {
      // Simular exportación
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Exportando reporte...');
    } finally {
      this.isLoading = false;
    }
  }

  getStatusColor(status: 'approved' | 'rejected' | 'pending'): string {
    const colors: { [key in 'approved' | 'rejected' | 'pending']: string } = {
      approved: 'bg-emerald-100 text-emerald-700',
      rejected: 'bg-red-100 text-red-700',
      pending: 'bg-yellow-100 text-yellow-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  }
}
