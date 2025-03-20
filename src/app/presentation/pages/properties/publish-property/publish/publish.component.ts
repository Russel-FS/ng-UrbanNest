import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ProgressTrackerServiceService } from '../../../../../core/services/progress-tracker-service.service';

@Component({
  selector: 'app-publish',
  imports: [CommonModule],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('800ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
  standalone: true
})
export class PublishComponent {
  property = {
    type: 'Casa',
    location: 'Ciudad Lima',
    characteristics: ['3 habitaciones', '2 baños', '1 estacionamiento'],
    photos: ['foto1.jpg', 'foto2.jpg'],
    plans: ['plano1.jpg'],
  };

  publishMessage: string | null = null;

  constructor(private progressTrackerService: ProgressTrackerServiceService) {}
  
  back() {
    this.progressTrackerService.backStep();
    console.log('Regresar al paso anterior');
  }

  publish() {
    this.publishMessage = '¡Excepcional! Tu propiedad está lista para cautivar al mundo';
    console.log('Propiedad publicada:', this.property);
  }
}
