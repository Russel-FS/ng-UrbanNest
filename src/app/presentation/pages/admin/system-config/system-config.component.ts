import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.scss'] ,
  imports: [CommonModule,FormsModule]
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

  saveSettings() {
    // Lógica para guardar configuración
  }
}
