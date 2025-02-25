import { Component, OnInit } from '@angular/core';
import { ProgressVerticalComponent } from '../../../../shared/components/progress-vertical/progress-vertical.component';
import { TypePropertyComponent } from './type-property/type-property.component';
import { ProgressVerticalServiceService } from '../../../../../core/services/progress-vertical-service.service';

@Component({
  selector: 'app-property-details',
  imports: [ProgressVerticalComponent, TypePropertyComponent],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css',
})
export class PropertyDetailsComponent implements OnInit {

  currentStep: number = 1;
  constructor(
    private progressVerticalService: ProgressVerticalServiceService
  ) {}

  ngOnInit(): void {
    this.progressVerticalService.progressBackStep$.subscribe(() => {
       this.currentStep--;
    });
    this.progressVerticalService.progressNextStep$.subscribe(() => {
        this.currentStep++;
    });
  }
}
