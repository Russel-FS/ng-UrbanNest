import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressTrackerServiceService } from '../../../../core/services/progress-tracker-service.service';

@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-tracker.component.html',
  styleUrl: './progress-tracker.component.css',
})
export class ProgressTrackerComponent implements OnInit {
  
  @Input() currentStep: number = 1;
  @Input() steps: {
    number: number;
    name: string;
    icon: string;
    isCompleted: boolean;
  }[] = [];
  maxReachedStep: number = 1;

  constructor(private progressTrackerService: ProgressTrackerServiceService) {}

  ngOnInit(): void {
    this.steps = [
      { number: 1, name: 'Principal', icon: '📝', isCompleted: false },
      { number: 2, name: 'Multimedia', icon: '📸', isCompleted: false },
      { number: 3, name: 'Extras', icon: '✨', isCompleted: false },
      { number: 4, name: 'Publicar', icon: '🚀', isCompleted: false },
    ];
    this.updateStepsCompletion();

    // Subscribimos al observable maxReachedStep$
    this.progressTrackerService.maxReachedStep$.subscribe((maxStep) => {
      this.maxReachedStep = maxStep;
      this.updateStepsCompletion();
    });
  }

  /**
   * Cambia al siguiente paso si el paso actual es menor o igual al máximo alcanzado
   *  y actualiza el estado de completitud de todos los pasos.
   *  Si el paso actual es el último, emite un evento para que el componente padre
   *  pueda realizar alguna acción.
   */
  goToStep(step: number): void {
    if (step <= this.maxReachedStep) {
      this.currentStep = step;
      this.updateStepsCompletion();
    }
  }

  /**
   * Actualiza el estado de completitud de cada paso en la lista de pasos.
   * Un paso se considera completado si su número es menor o igual al número
   * del paso actual.
   */

  private updateStepsCompletion(): void {
    this.steps.forEach((step) => {
      step.isCompleted = step.number <= this.currentStep;
    });
  }

  /**
   * Indica si el paso `step` ha sido completado.
   * Un paso se considera completado si su número es menor que el número
   * del paso actual.
   * @param step el número del paso a evaluar
   */
  isCompleted(step: number): boolean {
    return step < this.currentStep;
  }
  /**
   * Indica si el paso `step` es el paso actual.
   * @param step el número del paso a evaluar
   */
  isCurrent(step: number): boolean {
    return step === this.currentStep;
  }

  /**
   * Verifica si se puede ir al paso `step`.
   * @param step el número del paso a evaluar
   * @returns True si se puede ir al paso, de lo contrario false.
   */
  canGoToStep(step: number): boolean {
    return step <= this.maxReachedStep;
  }
}
