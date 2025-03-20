import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-help-center',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './help-center.component.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HelpCenterComponent {
  categories = [
    {
      title: 'Para Propietarios',
      icon: 'home',
      topics: [
        { title: 'Registro de Propiedades', link: '#' },
        { title: 'Subir Documentación', link: '#' },
        { title: 'Proceso de Validación', link: '#' },
      ]
    },
    {
      title: 'Para Inquilinos',
      icon: 'user',
      topics: [
        { title: 'Búsqueda de Propiedades', link: '#' },
        { title: 'Proceso de Alquiler', link: '#' },
        { title: 'Garantías Necesarias', link: '#' },
      ]
    },
    {
      title: 'Documentación',
      icon: 'document',
      topics: [
        { title: 'Requisitos Legales', link: '#' },
        { title: 'Formatos Aceptados', link: '#' },
        { title: 'Guías de Usuario', link: '#' },
      ]
    }
  ];
}
