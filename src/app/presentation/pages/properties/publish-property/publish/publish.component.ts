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
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
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
    // Lógica para publicar la propiedad
    this.publishMessage = '¡Fantástico! Tu propiedad está ahora visible para el mundo.';
    console.log('Propiedad publicada:', this.property);
  }
}
