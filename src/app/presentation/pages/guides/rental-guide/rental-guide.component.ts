import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rental-guide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rental-guide.component.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class RentalGuideComponent {
  steps = [
    {
      title: 'Búsqueda Inteligente',
      description: 'Encuentra la propiedad perfecta utilizando nuestros filtros avanzados de búsqueda.',
      requirements: [
        'Define tu presupuesto',
        'Selecciona la zona de interés',
        'Filtra por características deseadas'
      ]
    },
    {
      title: 'Documentación Inicial',
      description: 'Prepara los documentos básicos para agilizar el proceso de aplicación.',
      requirements: [
        'Identificación vigente',
        'Comprobantes de ingresos recientes',
        'Referencias personales'
      ]
    },
    {
      title: 'Exploración Visual',
      description: 'Examina detalladamente la propiedad a través de nuestra galería de imágenes HD.',
      requirements: [
        'Ver galería de fotos',
        'Revisar planos y medidas',
        'Explorar el vecindario'
      ]
    }
  ];
}
