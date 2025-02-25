import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-characteristics',
  imports: [],
  templateUrl: './characteristics.component.html',
  styleUrl: './characteristics.component.css',
})
export class CharacteristicsComponent implements OnInit {
  @Output() nextStepEvent = new EventEmitter<void>();
  @Output() previousStepEvent = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  nextStep(): void {
    this.nextStepEvent.emit();
  }

  backStep(): void {
    this.previousStepEvent.emit();
  }
}
