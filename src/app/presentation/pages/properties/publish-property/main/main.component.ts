import { Component } from '@angular/core';
import { ProgressTrackerComponent } from "../../../../shared/components/progress-tracker/progress-tracker.component";
import { ProgressVerticalComponent } from "../../../../shared/components/progress-vertical/progress-vertical.component";
 
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ProgressTrackerComponent, ProgressVerticalComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  currentStep: number = 2;
  subStep: number = 0;
  selectedOperationType: string = '';
  selectedPropertyType: string = '';

  onOperationTypeChange(value: string) {
    this.selectedOperationType = value;
  }

  onPropertyTypeChange(value: string) {
    this.selectedPropertyType = value;
  }

  onContinue() {
    // Implementar lógica para continuar
  }

  onSaveAndExit() {
    // Implementar lógica para guardar y salir
  }
}
