import { Component, OnInit } from '@angular/core';
import { ProgressTrackerComponent } from '../../../../shared/components/progress-tracker/progress-tracker.component';
import { PropertyDetailsComponent } from '../property-details/property-details.component';
import { ProgressTrackerServiceService } from '../../../../../core/services/progress-tracker-service.service';
import { CommonModule } from '@angular/common';
import { MultimediaComponent } from '../multimedia/multimedia.component';
import { ExtrasComponent } from '../extras/extras.component';
import { PublishComponent } from '../publish/publish.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ProgressTrackerComponent,
    PropertyDetailsComponent,
    CommonModule,
    MultimediaComponent,
    ExtrasComponent,
    PublishComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  currentStep: number = 4;

  constructor(private progressTrackerService: ProgressTrackerServiceService) {}

  ngOnInit(): void {
    this.progressTrackerService.progressNextStep$.subscribe(() => {
      this.currentStepIncrement();
    });
    this.progressTrackerService.progressBackStep$.subscribe(() => {
      this.currentSteptDecrement();
    });
  }

  currentStepIncrement(): void {
    this.currentStep++;
  }

  currentSteptDecrement(): void {
    if (this.currentStep >= 1) {
      this.currentStep--;
    }
  }
  updateCurrentStep(step: number): void {
    this.currentStep = step;
  }
}
