import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-management.component.html',
  styles: [
    `
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .animate-fade-in {
        animation: fadeIn 0.5s ease-out;
      }
    `,
  ],
})
export class UserManagementComponent {
  users: User[] = [
    {
      id: '1',
      name: 'flores solano',
      email: 'flores@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: new Date(),
    },
    {
      id: '2',
      name: 'Russel',
      email: 'Russel@example.com',
      role: 'agent',
      status: 'active',
      lastLogin: new Date(),
    },
  ];

  isLoading = false;

  async createUser() {}

  async resetPassword(userId: string) {
    this.isLoading = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Resetear contraseña para:', userId);
    } finally {
      this.isLoading = false;
    }
  }

  async updateRole(userId: string, role: string) {
    this.isLoading = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Actualizar rol:', userId, role);
    } finally {
      this.isLoading = false;
    }
  }
}
