import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [RouterOutlet, CommonModule, RouterModule],
  standalone: true, 
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-10px) scale(0.98)',
          transformOrigin: 'top',
        }),
        animate(
          '400ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({
            opacity: 1,
            transform: 'translateY(0) scale(1)',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({
            opacity: 0,
            transform: 'translateY(-10px) scale(0.98)',
          })
        ),
      ]),
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0
        }),
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', style({
          transform: 'translateX(0)',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({
          transform: 'translateX(-100%)',
          opacity: 0
        }))
      ])
    ]),
    trigger('fadeOverlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LayoutComponent {
  isMobileMenuOpen = false;
  isAlquilerOpen = false;

  showAlquilerMenu() {
    this.isAlquilerOpen = true;
  }

  hideAlquilerMenu() {
    this.isAlquilerOpen = false;
  }
  toggleAlquilerMenu() {
    this.isAlquilerOpen = !this.isAlquilerOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
