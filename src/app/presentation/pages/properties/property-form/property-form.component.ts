import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent {
  propertyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      location: ['', Validators.required],
      features: this.fb.group({
        bedrooms: [0, Validators.min(0)],
        bathrooms: [0, Validators.min(0)],
        area: [0, Validators.min(0)]
      }),
      documents: this.fb.array([])
    });
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      // Lógica para enviar el formulario
    }
  }
}
