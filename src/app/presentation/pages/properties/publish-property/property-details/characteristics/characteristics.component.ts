import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-characteristics',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './characteristics.component.html',
  styleUrl: './characteristics.component.css',
  standalone: true,
})
export class CharacteristicsComponent implements OnInit {
  @Output() nextStepEvent = new EventEmitter<void>();
  @Output() previousStepEvent = new EventEmitter<void>();

  characteristicsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.characteristicsForm = this.fb.group({
      bedrooms: [0],
      halfBathrooms: [0],
      bathrooms: [0],
      parkingSpaces: [0],
      builtArea: [
        0,
        [Validators.required, Validators.min(1), Validators.max(99999)],
      ],
      totalArea: [
        0,
        [Validators.required, Validators.min(1), Validators.max(999999)],
      ],
      propertyAge: this.fb.group({
        isNew: [false],
        underConstruction: [false],
        years: [0, [Validators.min(0)]],
      }),
      price: this.fb.group({
        propertyPrice: [
          0,
          [Validators.required, Validators.min(1), Validators.max(999999999)],
        ],
        maintenance: [0, [Validators.min(0)]],
        currency: ['USD'],
      }),
      description: this.fb.group({
        title: ['', Validators.required],
        fullDescription: ['', [Validators.required, Validators.minLength(150)]],
      }),
    });
  }

  ngOnInit(): void {}

  updateCounter(controlPath: string, increment: boolean): void {
    const control = this.characteristicsForm.get(controlPath);
    if (control) {
      const currentValue = control.value;
      const newValue = increment
        ? currentValue + 1
        : Math.max(0, currentValue - 1);
      control.setValue(newValue);
    }
  }

  validateDescription(): boolean {
    const descriptionGroup = this.characteristicsForm.get('description');
    return descriptionGroup ? descriptionGroup.valid : false;
  }

  nextStep(): void {
    if (this.characteristicsForm.valid) {
      this.nextStepEvent.emit();
    }
  }

  backStep(): void {
    this.previousStepEvent.emit();
  }

  getErrorMessage(fieldName: string): string {
    const control = this.characteristicsForm.get(fieldName);
    if (!control) return '';
    if (control.hasError('required')) return 'Este campo es requerido';
    if (control.hasError('min')) return 'El valor debe ser mayor a 0';
    if (control.hasError('max')) {
      if (fieldName === 'builtArea')
        return 'El área construida no puede exceder 99,999 m²';
      if (fieldName === 'totalArea')
        return 'El área total no puede exceder 999,999 m²';
      if (fieldName.includes('propertyPrice'))
        return 'El precio no puede exceder 999,999,999 USD';
    }
    return '';
  }
}
