import { Component, EventEmitter, OnInit, Output } from '@angular/core';
 
@Component({
  selector: 'app-type-property',
  imports: [],
  templateUrl: './type-property.component.html',
  styleUrl: './type-property.component.css',
})
export class TypePropertyComponent implements OnInit {

  @Output() nextStepEvent = new EventEmitter<void>();
  @Output() previousStepEvent = new EventEmitter<void>();
  constructor( 
  ) {}

  ngOnInit(): void {}

  nextStep(): void {
     this.nextStepEvent.emit();
  }

  backStep(): void {
    this.previousStepEvent.emit();
  }
}
