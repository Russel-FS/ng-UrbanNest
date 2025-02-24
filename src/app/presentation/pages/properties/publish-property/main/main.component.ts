import { Component } from '@angular/core';
import { ProgressTrackerComponent } from "../../../../shared/components/progress-tracker/progress-tracker.component";

@Component({
  selector: 'app-main',
  imports: [ProgressTrackerComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  currentStep: number = 1;
  
}
