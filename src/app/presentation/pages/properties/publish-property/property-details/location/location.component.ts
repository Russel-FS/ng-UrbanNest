import { Component, EventEmitter, OnInit, Output, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet'; 
import { GeocodingService } from '../../../../../../core/services/geocoding.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
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
      const data = await this.geocodingService.getLocationDetails(latlng.lat, latlng.lng);

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

  searchLocation(): void {
    const street = this.locationForm.get('street')?.value;
    const department = this.locationForm.get('department')?.value;
    this.map.setView([this.defaultLat, this.defaultLng], 15);
  }

  // Navegación entre pasos
  nextStep(): void {
    if (this.locationForm.valid) {
      this.nextStepEvent.emit();
    }
  }

  backStep(): void {
    this.previousStepEvent.emit();
  }

  saveAndExit(): void {
    console.log('Form data:', this.locationForm.value);
  }
}
