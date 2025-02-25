import { Component, OnInit } from '@angular/core';
import { ProgressTrackerComponent } from '../../../../shared/components/progress-tracker/progress-tracker.component';
import { PropertyDetailsComponent } from '../property-details/property-details.component';
import { ProgressTrackerServiceService } from '../../../../../core/services/progress-tracker-service.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ProgressTrackerComponent, PropertyDetailsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  currentStep: number = 1;

  constructor(private progressTrackerService: ProgressTrackerServiceService) {}

  ngOnInit(): void {
    this.progressTrackerService.progressNextStep$.subscribe(() => {
      this.currentIncrement();
    });
    this.progressTrackerService.progressBackStep$.subscribe(() => {
      this.currentDecrement();
    });
  }

  currentIncrement(): void {
    this.currentStep++;
  }

  currentDecrement(): void {
    if (this.currentStep === 1) {
      return;
    }
    this.currentStep--;
  }
}
