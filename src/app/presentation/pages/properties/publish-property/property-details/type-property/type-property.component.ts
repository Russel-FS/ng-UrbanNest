import { Component, OnInit } from '@angular/core';
import { ProgressVerticalServiceService } from '../../../../../../core/services/progress-vertical-service.service';

@Component({
  selector: 'app-type-property',
  imports: [],
  templateUrl: './type-property.component.html',
  styleUrl: './type-property.component.css',
})
export class TypePropertyComponent implements OnInit {
  constructor(
    private progressVerticalService: ProgressVerticalServiceService
  ) {}

  ngOnInit(): void {}

  nextStep(): void {
    this.progressVerticalService.nextStep();
  }

  backStep(): void {
    this.progressVerticalService.backStep();
  }
}
