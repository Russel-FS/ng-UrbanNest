import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Caracteristica {
  id: string;
  label: string;
  checked: boolean;
  type?: string;
}

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ExtrasComponent implements OnInit {
  searchQuery: string = '';
  isSuggestionsVisible: boolean = false;

  caracteristicas: {
    generales: { id: string; label: string; checked: boolean }[];
    servicios: { id: string; label: string; checked: boolean }[];
    exteriores: { id: string; label: string; checked: boolean }[];
    areasComunes: { id: string; label: string; checked: boolean }[];
  };

  constructor(private cdr: ChangeDetectorRef) {
    this.caracteristicas = {
      generales: [
        { id: 'mascotas', label: 'Permite mascotas', checked: true },
        { id: 'comedor', label: 'Comedor', checked: false },
        { id: 'kitchenette', label: 'Kitchenette', checked: false },
        { id: 'usoProfesional', label: 'Uso Profesional', checked: false },
      ],
      servicios: [
        { id: 'aire', label: 'Aire acondicionado', checked: false },
        { id: 'serviciosBasicos', label: 'Servicios básicos (agua/luz)', checked: false },
        { id: 'limpieza', label: 'Servicio de Limpieza', checked: false },
        { id: 'luminarias', label: 'Posee luminarias', checked: false },
      ],
      exteriores: [
        { id: 'areasVerdes', label: 'Áreas verdes', checked: false },
        { id: 'caminoTierra', label: 'Acceso por camino de tierra', checked: false },
        { id: 'terraza', label: 'Terraza', checked: false },
        { id: 'jardin', label: 'Jardín', checked: false },
      ],
      areasComunes: [
        { id: 'controlAccesos', label: 'Control de accesos', checked: false },
        { id: 'seguridad', label: 'Guardianía/Seguridad privada', checked: false },
        { id: 'alarma', label: 'Sistema de alarma', checked: false },
        { id: 'videoVigilancia', label: 'Video vigilancia', checked: false },
      ],
    };
  }
  ngOnInit(): void {}

  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    this.openSuggestions();
  }

  toggleCaracteristica(item: Caracteristica): void {
    item.checked = !item.checked;
    this.cdr.detectChanges();
  }

  closeSuggestions(): void {
    this.isSuggestionsVisible = false;
  }
  openSuggestions(): void {
    this.isSuggestionsVisible = true;
  }

  badgets() {
    return Object.entries(this.caracteristicas).flatMap(([type, items]) =>
      items
        .filter((item) => item.checked)
        .map((item) => ({
          ...item,
          type,
        }))
    );
  }

  removeBadget(badge: Caracteristica): void {
    const section = this.caracteristicas[badge.type as keyof typeof this.caracteristicas];
    const item = section.find((item) => item.id === badge.id);
    if (item) {
      item.checked = false;
    }
  }
  suggestions() {
    return Object.entries(this.caracteristicas).flatMap(([type, items]) =>
      items
        .filter((item) => item.label.toLowerCase().includes(this.searchQuery.toLowerCase()))
        .map((item) => ({
          ...item,
          type,
        }))
    );
  }

  selectedSuggestion(suggestion: Caracteristica) {
    this.closeSuggestions();
    Object.entries(this.caracteristicas).forEach(([type, items]) => {
      const item = items.find(
        (item) => item.label.toLowerCase() === suggestion.label.toLowerCase()
      );
      if (item) {
        item.checked = true;
      }
    });
  }
}
