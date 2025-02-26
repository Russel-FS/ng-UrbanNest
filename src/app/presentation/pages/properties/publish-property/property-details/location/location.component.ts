import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  AfterViewInit,
  OnDestroy,
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
import { Subject, takeUntil } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

interface LocationDetails {
  address?: {
    road?: string;
    house_number?: string;
    suburb?: string;
    state?: string;
    region?: string;
    city?: string;
    town?: string;
  };
}

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
          '300ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate(
          '300ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 0, transform: 'translateY(10px)' })
        ),
      ]),
    ]),
  ],
})
export class LocationComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() nextStepEvent = new EventEmitter<void>();
  @Output() previousStepEvent = new EventEmitter<void>();

  locationForm: FormGroup;
  private map!: L.Map;
  private marker: L.Marker | null = null;
  private destroy$ = new Subject<void>();
  private readonly mapConfig = {
    defaultLocation: { lat: -12.046374, lng: -77.042793 }, // Peru
    zoom: 13,
    tileLayer: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors',
    },
  };

  departments = ['Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Piura'];
 
  searchInput = new Subject<string>();
  suggestions: any[] = [];
  showSuggestions = false;

  constructor(
    private fb: FormBuilder,
    private geocodingService: GeocodingService
  ) {
    this.setupSearchStream();

    this.locationForm = this.fb.group({
      street: ['', Validators.required],
      address: ['', Validators.required],
      department: ['', Validators.required], 
      latitude: [''],
      longitude: [''],
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.map) {
      this.map.remove();
    }
  }

  private setupSearchStream(): void {
    this.geocodingService
      .createAddressSearchStream(this.searchInput)
      .pipe(takeUntil(this.destroy$))
      .subscribe((results) => {
        this.suggestions = results;
        this.showSuggestions = results.length > 0;
      });
  }

  private initializeMap(): void {
    const { defaultLocation, zoom, tileLayer } = this.mapConfig;

    this.map = L.map('map').setView(
      [defaultLocation.lat, defaultLocation.lng],
      zoom
    );

    L.tileLayer(tileLayer.url, {
      attribution: tileLayer.attribution,
    }).addTo(this.map);

    this.setupMapClickHandler();
  }

  private setupMapClickHandler(): void {
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.updateMarkerAndForm(e.latlng);
    });
  }

  private async updateMarkerAndForm(latlng: L.LatLng): Promise<void> {
    this.updateMarker(latlng);
    this.updateFormCoordinates(latlng);
    await this.updateLocationDetails(latlng);
  }

  private updateMarker(latlng: L.LatLng): void {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker(latlng).addTo(this.map);
  }

  private updateFormCoordinates(latlng: L.LatLng): void {
    this.locationForm.patchValue({
      latitude: latlng.lat,
      longitude: latlng.lng,
    });
  }

  private async updateLocationDetails(latlng: L.LatLng): Promise<void> {
    try {
      const data = await this.geocodingService.getLocationDetails(
        latlng.lat,
        latlng.lng
      );
      this.updateFormWithLocationData(data);
    } catch (error) {
      console.error('Error getting location details:', error);
    }
  }

  private updateFormWithLocationData(data: LocationDetails): void {
    if (data.address) {
      const { address } = data;
      this.locationForm.patchValue({
        street: address.road || '',
        address: this.formatAddress(address),
        department: this.matchDepartment(address.state || address.region || ''), 
      });
    }
  }

  private formatAddress(address: LocationDetails['address']): string {
    return [address?.house_number, address?.road, address?.suburb]
      .filter(Boolean)
      .join(', ');
  }

  private matchDepartment(state: string): string {
    return (
      this.departments.find((dept) =>
        state.toLowerCase().includes(dept.toLowerCase())
      ) || ''
    );
  }

  onDepartmentChange(): void {
    this.locationForm.patchValue({ province: '' });
  }

  searchLocation(): void {
    const street = this.locationForm.get('street')?.value;
    const department = this.locationForm.get('department')?.value;

    if (street && department) {
      const searchQuery = `${street}, ${department}, Perú`;
      this.searchInput.next(searchQuery);
    }
  }

  onSearchInput(event: any): void {
    const query = event.target.value;
    if (query.length >= 2) {
      this.searchInput.next(query);
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  selectSuggestion(suggestion: any): void {
    const latlng = L.latLng(suggestion.lat, suggestion.lon);

    this.locationForm.patchValue({
      street: suggestion.display_name,
      latitude: suggestion.lat,
      longitude: suggestion.lon,
    });

    this.map.setView(latlng, 16);
    this.updateMarker(latlng);

    this.showSuggestions = false;
    this.suggestions = [];
  }

  nextStep(): void {
    if (this.locationForm.valid) {
      this.nextStepEvent.emit();
    }
  }

  backStep(): void {
    this.previousStepEvent.emit();
  }
}
