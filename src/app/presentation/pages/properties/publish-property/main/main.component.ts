import { Component } from '@angular/core';
import { ProgressTrackerComponent } from "../../../../shared/components/progress-tracker/progress-tracker.component";
import { ProgressVerticalComponent } from "../../../../shared/components/progress-vertical/progress-vertical.component";
import { PropertyDetailsComponent } from "../property-details/property-details.component";
 
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ProgressTrackerComponent, PropertyDetailsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  currentStep: number = 1;
  
  currentIncrement(): void {
    this.currentStep++;
  }

  currentDecrement(): void {
    this.currentStep--;
  }

}
