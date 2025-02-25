import { Component, EventEmitter, OnInit, Output, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
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
    'Lima': ['Lima', 'Callao', 'Huaral', 'Cañete'],
    'Arequipa': ['Arequipa', 'Camaná', 'Islay'],
  };

  constructor(private fb: FormBuilder) {
    this.locationForm = this.fb.group({
      street: ['', Validators.required],
      address: ['', Validators.required],
      department: ['', Validators.required],
      province: ['', Validators.required],
      latitude: [''],
      longitude: ['']
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([this.defaultLat, this.defaultLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.updateMarker(e.latlng);
    });
  }

  private updateMarker(latlng: L.LatLng): void {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker(latlng).addTo(this.map);
    this.locationForm.patchValue({
      latitude: latlng.lat,
      longitude: latlng.lng
    });
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
