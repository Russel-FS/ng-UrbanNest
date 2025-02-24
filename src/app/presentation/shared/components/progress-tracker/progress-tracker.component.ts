import { Component, input, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-tracker.component.html',
  styleUrl: './progress-tracker.component.css',
})
export class ProgressTrackerComponent implements OnInit   {
   
  @Input() currentStep: number = 1;

  @Input() steps: { number: number; name: string; icon: string }[] = [];

   
  ngOnInit(): void {
     this.steps = [
      { number: 1, name: 'Principal', icon: '📝' },
      { number: 2, name: 'Multimedia', icon: '📸' },
      { number: 3, name: 'Extras', icon: '✨' },
      { number: 4, name: 'Publicar', icon: '🚀' },
    ];
  }
  isCompleted(step: number): boolean {
    return step < this.currentStep;
  }

  isCurrent(step: number): boolean {
    return step === this.currentStep;
  }
   
}
