import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  AfterViewInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { GeocodingService } from '../../../../../../core/services/geocoding.service';
import { Subject } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '600ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate(
          '600ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 0, transform: 'translateY(10px)' })
        ),
      ]),
    ]),
  ],
})
export class LocationComponent implements OnInit, AfterViewInit {
  @Output() nextStepEvent = new EventEmitter<void>();
  @Output() previousStepEvent = new EventEmitter<void>();

  locationForm: FormGroup;
  private map!: L.Map;
  private marker: L.Marker | null = null;

  // Default coordinates (Peru)
  private defaultLat = -12.046374;
  private defaultLng = -77.042793;

  departments = ['Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Piura'];
  provinces: { [key: string]: string[] } = {
    Lima: ['Lima', 'Callao', 'Huaral', 'Cañete'],
    Arequipa: ['Arequipa', 'Camaná', 'Islay'],
  };

  // Observable para manejar la entrada de búsqueda
  searchInput = new Subject<string>();
  suggestions: any[] = [];
  showSuggestions = false;

  constructor(
    private fb: FormBuilder,
    private geocodingService: GeocodingService
  ) {
    this.locationForm = this.fb.group({
      street: ['', Validators.required],
      address: ['', Validators.required],
      department: ['', Validators.required],
      province: ['', Validators.required],
      latitude: [''],
      longitude: [''],
    });

    // Configurar stream de búsqueda
    this.geocodingService
      .createAddressSearchStream(this.searchInput)
      .subscribe((results) => {
        this.suggestions = results;
        this.showSuggestions = results.length > 0;
      });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([this.defaultLat, this.defaultLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.updateMarker(e.latlng);
    });
  }

  // Actualizar el marcador y el formulario con la ubicación seleccionada
  private async updateMarker(latlng: L.LatLng): Promise<void> {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker(latlng).addTo(this.map);
    this.locationForm.patchValue({
      latitude: latlng.lat,
      longitude: latlng.lng,
    });

    // Obtener información de la ubicación usando Nominatim
    try {
      const data = await this.geocodingService.getLocationDetails(
        latlng.lat,
        latlng.lng
      );

      // Actualizar el formulario con la información obtenida
      if (data.address) {
        this.locationForm.patchValue({
          street: data.address.road || '',
          address: [
            data.address.house_number,
            data.address.road,
            data.address.suburb,
          ]
            .filter(Boolean)
            .join(', '),
          department: this.matchDepartment(
            data.address.state || data.address.region || ''
          ),
          province: data.address.city || data.address.town || '',
        });
      }
    } catch (error) {
      console.error('Error getting location details:', error);
    }
  }

  // Método para encontrar el departamento más cercano
  private matchDepartment(state: string): string {
    // Encontrar el departamento más cercano en nuestra lista
    return (
      this.departments.find((dept) =>
        state.toLowerCase().includes(dept.toLowerCase())
      ) || ''
    );
  }

  onDepartmentChange(): void {
    const department = this.locationForm.get('department')?.value;
    this.locationForm.patchValue({ province: '' });
  }
  // Método para buscar la ubicación
  searchLocation(): void {
    const street = this.locationForm.get('street')?.value;
    const department = this.locationForm.get('department')?.value;
    this.map.setView([this.defaultLat, this.defaultLng], 15);
  }

  // Método para manejar la entrada de búsqueda
  onSearchInput(event: any): void {
    const query = event.target.value;
    if (query.length >= 3) {
      this.searchInput.next(query);
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  // Método para seleccionar una sugerencia
  selectSuggestion(suggestion: any): void {
    this.locationForm.patchValue({
      street: suggestion.display_name,
      latitude: suggestion.lat,
      longitude: suggestion.lon,
    });

    const latlng = L.latLng(suggestion.lat, suggestion.lon);
    this.map.setView(latlng, 16);
    this.updateMarker(latlng);

    this.showSuggestions = false;
    this.suggestions = [];
  }

  // Navegación entre pasos
  nextStep(): void {
    if (this.locationForm.valid) {
      this.nextStepEvent.emit();
    }
  }
  // Método para retroceder al paso anterior
  backStep(): void {
    this.previousStepEvent.emit();
  }
  // Método para guardar y salir
  saveAndExit(): void {
    console.log('Form data:', this.locationForm.value);
  }
}
