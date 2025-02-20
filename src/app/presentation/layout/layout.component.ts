import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [RouterOutlet, CommonModule],
  standalone: true,
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-10px) scale(0.98)',
          transformOrigin: 'top'
        }),
        animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({
          opacity: 1,
          transform: 'translateY(0) scale(1)',
        }))
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.35, 0, 0.25, 1)', style({
          opacity: 0,
          transform: 'translateY(-10px) scale(0.98)',
        }))
      ])
    ])
  ],
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
