import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface PropertyFeature {
  icon: string;
  label: string;
  control: string;
}

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out;
    }
  `]
})
export class PropertyFormComponent implements OnInit {
  propertyForm: FormGroup;
  isLoading = false;
  uploadedImages: string[] = [];

  features: PropertyFeature[] = [
    { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', 
      label: 'Habitaciones', 
      control: 'bedrooms' },
    { icon: 'M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2zm0 0V5', 
      label: 'Baños', 
      control: 'bathrooms' },
    { icon: 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4', 
      label: 'Área (m²)', 
      control: 'area' }
  ];

  propertyTypes = [
    { value: 'house', label: 'Casa' },
    { value: 'apartment', label: 'Apartamento' },
    { value: 'office', label: 'Oficina' },
    { value: 'land', label: 'Terreno' }
  ];

  constructor(private fb: FormBuilder) {
    this.propertyForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      price: ['', [Validators.required, Validators.min(0)]],
      type: ['', Validators.required],
      location: this.fb.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.pattern('^[0-9]{5}$')]
      }),
      features: this.fb.group({
        bedrooms: [0, [Validators.required, Validators.min(0)]],
        bathrooms: [0, [Validators.required, Validators.min(0)]],
        area: [0, [Validators.required, Validators.min(0)]]
      }),
      amenities: this.fb.array([]),
      documents: this.fb.array([]),
      images: this.fb.array([])
    });
  }

  ngOnInit() {
   
    const defaultAmenities = ['Estacionamiento', 'Seguridad 24/7', 'Área verde'];
    defaultAmenities.forEach(() => this.addAmenity());
  }

  get amenities() {
    return this.propertyForm.get('amenities') as FormArray;
  }

  addAmenity() {
    this.amenities.push(this.fb.control(''));
  }

  removeAmenity(index: number) {
    this.amenities.removeAt(index);
  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    if (this.propertyForm.valid) {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simular envío
        console.log('Propiedad guardada:', this.propertyForm.value);
      } finally {
        this.isLoading = false;
      }
    } else {
      this.markFormGroupTouched(this.propertyForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.propertyForm.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) return 'Este campo es requerido';
      if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      if (control.errors['min']) return 'El valor debe ser mayor a 0';
      if (control.errors['pattern']) return 'Formato inválido';
    }
    return '';
  }
}
