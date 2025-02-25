import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-location',
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit {

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
