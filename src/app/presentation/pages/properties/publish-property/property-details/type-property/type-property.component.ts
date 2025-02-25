import { Component, OnInit } from '@angular/core';
import { ProgressTrackerServiceService } from '../../../../../../core/services/progress-tracker-service.service';
 
@Component({
  selector: 'app-type-property',
  imports: [],
  templateUrl: './type-property.component.html',
  styleUrl: './type-property.component.css',
})
export class TypePropertyComponent implements OnInit {
  constructor(private progressTrackerService: ProgressTrackerServiceService) {}

  ngOnInit(): void {}

  nextStep(): void {
    this.progressTrackerService.nextStep();
  }

  backStep(): void {
    this.progressTrackerService.backStep();
  }
}
