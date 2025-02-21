import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .animate-fade-in {
      animation: fadeIn 0.5s ease-out;
    }

    .animate-slide-up {
      animation: slideUp 0.5s ease-out;
    }
  `]
})
export class SystemConfigComponent {
  systemSettings = {
    maxImageSize: 5,
    maxImagesPerProperty: 10,
    allowedImageTypes: ['jpg', 'png'],
    validationCriteria: {
      requiresDocumentation: true,
      minImageResolution: '1024x768'
    }
  };

  async saveSettings() {
    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      // logica para guardar la configuración
       
      console.log('Configuración guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar la configuración:', error);
    }
  }
}
