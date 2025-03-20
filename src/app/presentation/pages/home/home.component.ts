import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Suggestion {
  name: string;
  type: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '600ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '600ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 0, transform: 'translateY(20px)' })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent {
  searchQuery: string = '';
  showSuggestions: boolean = false;
  suggestions: Suggestion[] = [
    // Distritos tradicionales
    { name: 'Miraflores, Lima', type: 'Distrito turístico y residencial' },
    { name: 'San Isidro, Lima', type: 'Distrito financiero' },
    { name: 'Barranco, Lima', type: 'Distrito bohemio y cultural' },
    { name: 'La Molina, Lima', type: 'Distrito residencial' },
    { name: 'San Borja, Lima', type: 'Distrito moderno' },
    { name: 'Santiago de Surco, Lima', type: 'Distrito residencial' },
    { name: 'Jesús María, Lima', type: 'Distrito céntrico' },
    { name: 'Magdalena del Mar, Lima', type: 'Distrito costero' },

    // Distritos modernos
    { name: 'San Miguel, Lima', type: 'Distrito comercial y residencial' },
    { name: 'Pueblo Libre, Lima', type: 'Distrito histórico' },
    { name: 'Lince, Lima', type: 'Distrito céntrico' },
    { name: 'Los Olivos, Lima', type: 'Distrito emergente' },
    { name: 'San Juan de Lurigancho, Lima', type: 'Distrito populoso' },
    { name: 'San Juan de Miraflores, Lima', type: 'Distrito residencial' },
    { name: 'La Victoria, Lima', type: 'Distrito comercial' },
    { name: 'Chorrillos, Lima', type: 'Distrito costero' },

    // Zonas específicas y exclusivas
    { name: 'Costa Verde, Lima', type: 'Zona costera' },
    { name: 'La Punta, Callao', type: 'Zona residencial exclusiva' },
    { name: 'San Bartolo, Lima', type: 'Balneario' },
    { name: 'Asia, Lima', type: 'Balneario exclusivo' },
    { name: 'La Molina Vieja', type: 'Zona residencial exclusiva' },
    { name: 'Santa María del Mar', type: 'Balneario' },

    // Zonas comerciales importantes
    { name: 'Jockey Plaza, Surco', type: 'Zona comercial' },
    { name: 'Centro Financiero, San Isidro', type: 'Zona empresarial' },
    { name: 'Centro de Lima', type: 'Zona histórica' },
    { name: 'La Rambla, San Borja', type: 'Zona comercial' },
    { name: 'Plaza San Miguel', type: 'Zona comercial' },

    // Urbanizaciones destacadas
    { name: 'Chacarilla, Surco', type: 'Urbanización exclusiva' },
    { name: 'La Planicie, La Molina', type: 'Urbanización exclusiva' },
    { name: 'Las Casuarinas, Surco', type: 'Urbanización exclusiva' },
    { name: 'Santa Patricia, La Molina', type: 'Urbanización residencial' },
    { name: 'Valle Hermoso, Surco', type: 'Urbanización residencial' },

    // Distritos zona norte
    { name: 'Comas, Lima', type: 'Distrito residencial y comercial' },
    { name: 'Carabayllo, Lima', type: 'Distrito en desarrollo' },
    { name: 'Independencia, Lima', type: 'Distrito comercial' },
    { name: 'San Martín de Porres, Lima', type: 'Distrito residencial' },
    { name: 'Puente Piedra, Lima', type: 'Distrito emergente' },
    { name: 'Ancón, Lima', type: 'Distrito balneario' },
    { name: 'Santa Rosa, Lima', type: 'Distrito costero' },

    // Distritos zona este
    { name: 'Ate Vitarte, Lima', type: 'Distrito industrial' },
    { name: 'Santa Anita, Lima', type: 'Distrito comercial' },
    { name: 'El Agustino, Lima', type: 'Distrito residencial' },
    { name: 'Lurigancho-Chosica, Lima', type: 'Distrito campestre' },
    { name: 'Chaclacayo, Lima', type: 'Distrito recreacional' },
    { name: 'Cieneguilla, Lima', type: 'Distrito campestre' },

    // Zonas comerciales emergentes
    { name: 'Mega Plaza, Independencia', type: 'Centro comercial' },
    { name: 'Plaza Norte, Independencia', type: 'Centro comercial' },
    { name: 'Mall Aventura Plaza, Santa Anita', type: 'Centro comercial' },
    { name: 'Real Plaza Pro, San Martín de Porres', type: 'Centro comercial' },

    // Urbanizaciones populares
    { name: 'El Retablo, Comas', type: 'Urbanización residencial' },
    { name: 'Santa Isabel, Carabayllo', type: 'Urbanización residencial' },
    { name: 'El Pinar, Comas', type: 'Urbanización residencial' },
    { name: 'Los Jardines, SMP', type: 'Urbanización residencial' },
    { name: 'Naranjal, SMP', type: 'Urbanización comercial' },
    { name: 'Pro, Los Olivos', type: 'Urbanización industrial' },

    // Zonas industriales
    { name: 'Zona Industrial, Ate', type: 'Zona industrial' },
    { name: 'Infantas, Los Olivos', type: 'Zona industrial' },
    { name: 'Huachipa, Lima', type: 'Zona industrial' },
    { name: 'Gambetta, Callao', type: 'Zona industrial' },
  ];
  filteredSuggestions: Suggestion[] = [];

  onSearchInput() {
    if (this.searchQuery.length > 0) {
      this.filteredSuggestions = this.suggestions.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.showSuggestions = true;
    } else {
      this.showSuggestions = false;
      this.filteredSuggestions = [];
    }
  }

  selectSuggestion(suggestion: Suggestion) {
    this.searchQuery = suggestion.name;
    this.showSuggestions = false;
  }
}
