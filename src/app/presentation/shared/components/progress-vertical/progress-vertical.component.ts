import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core'; 

@Component({
  selector: 'app-progress-vertical',
  imports: [CommonModule],
  templateUrl: './progress-vertical.component.html',
  styleUrl: './progress-vertical.component.css',
})
export class ProgressVerticalComponent {
  @Input() steps: {
    number: number;
    name: string;
    icon?: string; 
  }[] = [];
  @Input() currentStep: number = 1;

  constructor() {
    this.steps = [
      {
        number: 1,
        name: 'Tipo de propiedad',
        icon: 'icon1', 
      },
      {
        number: 2,
        name: 'Ubicación',
        icon: 'icon2', 
      },
      {
        number: 3,
        name: 'Características',
        icon: 'icon 3',  
      },
    ];
  }

  isCurrent(step: number): boolean {
    return this.currentStep === step;
  }
 
  isCompleted(step: number): boolean {
    return this.currentStep > step;
  }

}
