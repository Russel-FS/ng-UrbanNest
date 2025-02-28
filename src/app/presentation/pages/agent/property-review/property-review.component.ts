import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PropertyReview {
  id: string;
  propertyId: string;
  reviewDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  comments: string;
  criteria: ReviewCriteria[];
}

interface ReviewCriteria {
  id: string;
  label: string;
  checked: boolean;
  required: boolean;
  category: 'basic' | 'legal' | 'quality';
}

@Component({
  selector: 'app-property-review',
  templateUrl: './property-review.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [
    `
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .animate-fade-in {
        animation: fadeIn 0.5s ease-out;
      }
    `,
  ],
})
export class PropertyReviewComponent {
  property = {
    id: '1',
    title: 'Casa Moderna en Centro',
    address: 'Av. Principal 123',
    price: 250000,
    images: ['img1.jpg', 'img2.jpg'],
    documents: ['doc1.pdf', 'doc2.pdf'],
  };

  reviewCriteria: ReviewCriteria[] = [
    // Información Básica
    {
      id: 'complete_info',
      label: 'Información completa y precisa',
      checked: false,
      required: true,
      category: 'basic',
    },
    {
      id: 'price_market',
      label: 'Precio acorde al mercado',
      checked: false,
      required: true,
      category: 'basic',
    },
    {
      id: 'location_correct',
      label: 'Ubicación correctamente especificada',
      checked: false,
      required: true,
      category: 'basic',
    },

    // Documentación Legal
    {
      id: 'property_docs',
      label: 'Documentación de propiedad',
      checked: false,
      required: true,
      category: 'legal',
    },
    {
      id: 'tax_status',
      label: 'Estado de impuestos al día',
      checked: false,
      required: true,
      category: 'legal',
    },
    {
      id: 'permits',
      label: 'Permisos y licencias',
      checked: false,
      required: false,
      category: 'legal',
    },

    // Calidad de Presentación
    {
      id: 'photo_quality',
      label: 'Fotos de alta calidad',
      checked: false,
      required: true,
      category: 'quality',
    },
    {
      id: 'description',
      label: 'Descripción detallada',
      checked: false,
      required: true,
      category: 'quality',
    },
    {
      id: 'virtual_tour',
      label: 'Tour virtual disponible',
      checked: false,
      required: false,
      category: 'quality',
    },
  ];

  comments: string = '';
  isLoading = false;

  get isReadyToSubmit(): boolean {
    return this.reviewCriteria.filter((c) => c.required).every((c) => c.checked);
  }

  getCriteriaByCateogry(category: 'basic' | 'legal' | 'quality'): ReviewCriteria[] {
    return this.reviewCriteria.filter((c) => c.category === category);
  }

  async submitReview(status: 'approved' | 'rejected') {
    if (status === 'approved' && !this.isReadyToSubmit) {
      console.error('No se pueden cumplir los criterios mínimos');
      return;
    }

    this.isLoading = true;
    try {
      const review: PropertyReview = {
        id: Date.now().toString(),
        propertyId: this.property.id,
        reviewDate: new Date(),
        status,
        comments: this.comments,
        criteria: [...this.reviewCriteria],
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Review enviada:', review);
    } finally {
      this.isLoading = false;
    }
  }
}
