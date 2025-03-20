import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface ContactData {
  firstName: string;
  lastName: string;
  condition: 'natural' | 'juridica';
  documentType: 'dni' | 'ruc';
  documentNumber: string;
  mobilePhone: string;
  optionalPhone?: string;
}

@Component({
  selector: 'app-account-setup-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-setup-form.component.html',
  styles: [`
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .animate-slide-up {
      animation: slideUp 0.5s ease-out;
    }
  `]
})
export class AccountSetupFormComponent {
  setupForm: FormGroup;
  isSubmitting = false;

  conditions = [
    { value: 'natural', label: 'Persona Natural', documentType: 'dni', maxLength: 8 },
    { value: 'juridica', label: 'Persona Jurídica', documentType: 'ruc', maxLength: 11 }
  ];

  constructor(private fb: FormBuilder) {
    this.setupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      condition: ['natural', Validators.required],
      documentType: ['dni'],
      documentNumber: ['', [Validators.required]],
      mobilePhone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      optionalPhone: ['', [Validators.pattern('^[0-9]{9}$')]]
    });

    // Observar cambios en condition para actualizar validaciones de documento
    this.setupForm.get('condition')?.valueChanges.subscribe(condition => {
      const documentControl = this.setupForm.get('documentNumber');
      const selectedCondition = this.conditions.find(c => c.value === condition);
      
      if (selectedCondition) {
        this.setupForm.patchValue({ documentType: selectedCondition.documentType });
        documentControl?.setValidators([
          Validators.required,
          Validators.pattern(`^[0-9]{${selectedCondition.maxLength}}$`)
        ]);
        documentControl?.updateValueAndValidity();
      }
    });
  }

  getFieldError(field: string): string {
    const control = this.setupForm.get(field);
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Este campo es requerido';
      if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      if (control.errors['pattern']) {
        if (field === 'documentNumber') {
          const condition = this.setupForm.get('condition')?.value;
          return condition === 'natural' ? 
            'DNI debe tener 8 dígitos' : 
            'RUC debe tener 11 dígitos';
        }
        if (field === 'mobilePhone' || field === 'optionalPhone') return 'Número de teléfono inválido';
      }
    }
    return '';
  }

  getDocumentLabel(): string {
    return this.setupForm.get('condition')?.value === 'natural' ? 'DNI' : 'RUC';
  }

  async onSubmit() {
    if (this.setupForm.valid) {
      this.isSubmitting = true;
      try {
        const formData: ContactData = this.setupForm.value;
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        console.log('Datos enviados:', formData);
        
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.setupForm.markAllAsTouched();
    }
  }
}
