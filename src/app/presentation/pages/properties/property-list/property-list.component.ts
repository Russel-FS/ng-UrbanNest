import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PropertyCardComponent } from '../../../shared/components/property-card/property-card.component';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: 'house' | 'apartment' | 'office' | 'land';
  status: 'available' | 'sold' | 'pending';
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number;
  };
  images: String[];
}

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, PropertyCardComponent],
  styles: [
    `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
      from { transform: translateX(-20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1); }
    }

    :host {
      display: block;
      min-height: 100vh;
      background: #f8fafc;
    }

    .animate-fade-in {
      animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .animate-slide-in {
      animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .property-card {
      transition: all 0.3s ease;
    }

    .property-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    }

    /* Scrollbar styling */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  `,
  ],
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [
    {
      id: '1',
      title: 'Casa Moderna en Centro',
      price: 250000,
      location: 'Centro, Ciudad',
      type: 'house',
      status: 'available',
      features: {
        bedrooms: 3,
        bathrooms: 2,
        area: 150,
      },
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
    },
  ];

  filterOptions = {
    status: 'all',
    type: 'all',
    price: { min: 0, max: 1000000 },
    features: {
      minBedrooms: 0,
      minBathrooms: 0,
      minArea: 0,
    },
  };

  propertyTypes = [
    { value: 'all', label: 'Todos' },
    { value: 'house', label: 'Casas' },
    { value: 'apartment', label: 'Apartamentos' },
    { value: 'office', label: 'Oficinas' },
    { value: 'land', label: 'Terrenos' },
  ];

  statusTypes = [
    { value: 'all', label: 'Todos' },
    { value: 'available', label: 'Disponible' },
    { value: 'sold', label: 'Vendido' },
    { value: 'pending', label: 'En Proceso' },
  ];

  isLoading = false;
  searchQuery = '';
  sortOption = 'newest';
  viewMode: 'grid' | 'list' = 'grid';

  async applyFilters() {
    this.isLoading = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      this.isLoading = false;
    }
  }

  resetFilters() {
    this.filterOptions = {
      status: 'all',
      type: 'all',
      price: { min: 0, max: 1000000 },
      features: {
        minBedrooms: 0,
        minBathrooms: 0,
        minArea: 0,
      },
    };
    this.applyFilters();
  }

  async searchProperties() {
    this.isLoading = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
    } finally {
      this.isLoading = false;
    }
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  sortProperties(option: string) {
    this.sortOption = option;
  }

  ngOnInit() {
    this.loadProperties();
  }

  private async loadProperties() {
    this.isLoading = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.properties = [
        {
          id: '1',
          title: 'Apartamento de Lujo en Centro',
          price: 450000,
          location: 'Centro Histórico',
          type: 'apartment',
          status: 'available',
          features: {
            bedrooms: 3,
            bathrooms: 2,
            area: 180,
          },
          images: [
            'https://limasabe.pe/wp-content/uploads/2021/07/comprar-un-departamento-en-Lima.jpg',
            'apartment2.jpg',
          ],
        },
      ];
    } finally {
      this.isLoading = false;
    }
  }
}
