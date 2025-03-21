import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyCardComponent } from '../../../shared/components/property-card/property-card.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, PropertyCardComponent],
  styleUrls: ['./property-list.component.scss'],
  animations: [
    trigger('fadeMobile', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(+20px)' }),
        animate(
          '600ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate(
          '600ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 0, transform: 'translateX(+20px)' })
        ),
      ]),
    ]),
    trigger('fadeOverlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class PropertyListComponent implements OnInit {
  // Props y estado
  properties: Property[] = [];
  isLoading = false;
  searchQuery = '';
  sortOption = 'newest';
  viewMode: 'grid' | 'list' = 'grid';
  showMobileFilters = false;

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

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadProperties();
  }

  async loadProperties() {
    this.isLoading = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.properties = [
        {
          id: '1',
          title: 'Moderno Apartamento en Miraflores',
          price: 250000,
          location: 'Miraflores, Lima',
          type: 'apartment',
          status: 'available',
          features: {
            bedrooms: 3,
            bathrooms: 2,
            area: 120,
          },
          images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
          ],
        },
        {
          id: '2',
          title: 'Casa Familiar en La Molina',
          price: 450000,
          location: 'La Molina, Lima',
          type: 'house',
          status: 'available',
          features: {
            bedrooms: 4,
            bathrooms: 3,
            area: 280,
          },
          images: [
            'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
            'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
          ],
        },
        {
          id: '3',
          title: 'Oficina Prime en San Isidro',
          price: 380000,
          location: 'San Isidro, Lima',
          type: 'office',
          status: 'pending',
          features: {
            bedrooms: 0,
            bathrooms: 2,
            area: 150,
          },
          images: [
            'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg',
            'https://images.pexels.com/photos/1743555/pexels-photo-1743555.jpeg',
          ],
        },
        {
          id: '4',
          title: 'Penthouse de Lujo en Barranco',
          price: 750000,
          location: 'Barranco, Lima',
          type: 'apartment',
          status: 'available',
          features: {
            bedrooms: 4,
            bathrooms: 4,
            area: 320,
          },
          images: [
            'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
            'https://images.pexels.com/photos/1643385/pexels-photo-1643385.jpeg',
          ],
        },
        {
          id: '5',
          title: 'Terreno Industrial en Lurín',
          price: 850000,
          location: 'Lurín, Lima',
          type: 'land',
          status: 'available',
          features: {
            bedrooms: 0,
            bathrooms: 0,
            area: 1500,
          },
          images: ['https://images.pexels.com/photos/5407074/pexels-photo-5407074.jpeg'],
        },
      ];
    } finally {
      this.isLoading = false;
    }
  }

  async applyFilters() {
    this.isLoading = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      // Aplicar filtros
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

  sortProperties(option: string) {
    switch (option) {
      case 'price_asc':
        this.properties.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        this.properties.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        this.properties.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        break;
    }
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  viewPropertyDetails(id: string) {
    this.router.navigate(['/property', id]);
  }

  // Mobile filters
  openFilters() {
    this.showMobileFilters = true;
  }

  closeMobileFilters() {
    this.showMobileFilters = false;
  }

  applyFiltersAndClose() {
    this.applyFilters();
    this.closeMobileFilters();
  }
}

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
  images: string[];
}
