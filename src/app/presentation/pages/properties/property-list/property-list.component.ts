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
  styleUrls: ['./property-list.component.css'],
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
        {
          id: '2',
          title: 'Casa de Lujo en el Bosque',
          price: 650000,
          location: 'Bosque Residencial',
          type: 'house',
          status: 'available',
          features: {
            bedrooms: 4,
            bathrooms: 3,
            area: 250,
          },
          images: [
            'https://static-propia.kiteprop.com/7491665/111796568579772748410681886334922168132930152113908593833892870557879181327816.jpg',
          ],
        },
      ];
    } finally {
      this.isLoading = false;
    }
  }
}
