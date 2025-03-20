import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ProgressTrackerServiceService } from '../../../../../core/services/progress-tracker-service.service';

interface ImageDimensions {
  width: number;
  height: number;
}

interface MediaConfig {
  files: File[];
  previews: string[];
  isDragging: boolean;
  errorMessage: string;
}

type MediaType = 'photos' | 'plans';

@Component({
  selector: 'app-multimedia',
  standalone: true,
  imports: [CommonModule, CdkDrag, CdkDropList, CdkDropListGroup],
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.css'],
})
export class MultimediaComponent implements OnDestroy {
  private readonly CONFIG = {
    PHOTO_MAX_FILES: 10,
    PHOTO_MIN_FILES: 3,
    PLAN_MAX_FILES: 10,
    MIN_DIMENSIONS: 500,
    MAX_DIMENSIONS: 6000,
    VALID_TYPES: ['image/jpeg', 'image/jpg', 'image/png'] as string[],
  } as const;

  private mediaState: Record<MediaType, MediaConfig> = {
    photos: {
      files: [],
      previews: [],
      isDragging: false,
      errorMessage: '',
    },
    plans: {
      files: [],
      previews: [],
      isDragging: false,
      errorMessage: '',
    },
  };

  constructor(private progressTrackerService: ProgressTrackerServiceService) {}

  // getters
  get photoFiles(): File[] {
    return this.mediaState.photos.files;
  }
  get photoPreviews(): string[] {
    return this.mediaState.photos.previews;
  }
  get isPhotoDragging(): boolean {
    return this.mediaState.photos.isDragging;
  }
  get photoErrorMessage(): string {
    return this.mediaState.photos.errorMessage;
  }

  get planFiles(): File[] {
    return this.mediaState.plans.files;
  }
  get planPreviews(): string[] {
    return this.mediaState.plans.previews;
  }
  get isPlanDragging(): boolean {
    return this.mediaState.plans.isDragging;
  }
  get planErrorMessage(): string {
    return this.mediaState.plans.errorMessage;
  }

  // setter de mensajes de errores
  private set photoErrorMessage(value: string) {
    this.mediaState.photos.errorMessage = value;
  }
  private set planErrorMessage(value: string) {
    this.mediaState.plans.errorMessage = value;
  }
  // Limpia las URL de los objetos URL
  ngOnDestroy(): void {
    this.cleanupObjectURLs();
  }

  onDragOver(event: DragEvent, type: MediaType): void {
    event.preventDefault();
    event.stopPropagation();
    this.mediaState[type].isDragging = true;
  }

  onDragLeave(event: DragEvent, type: MediaType): void {
    event.preventDefault();
    event.stopPropagation();
    this.mediaState[type].isDragging = false;
  }
  // Archivos arrastrados sobre la zona de soltar
  async onDrop(event: DragEvent, type: MediaType): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    this.mediaState[type].isDragging = false;

    const droppedFiles = event.dataTransfer?.files;
    if (droppedFiles) {
      await this.processFiles(Array.from(droppedFiles), type);
      this.setErrorMessage(type, '');
    }
  }

  // Archivo seleccionado desde el input file
  async onFileSelected(event: Event, type: MediaType): Promise<void> {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      await this.processFiles(Array.from(files), type);
    }
  }
  // Elimina el archivo seleccionado
  removeFile(index: number, type: MediaType): void {
    const media = this.mediaState[type];
    URL.revokeObjectURL(media.previews[index]);
    media.files.splice(index, 1);
    media.previews.splice(index, 1);

    if (type === 'photos' && media.files.length < this.CONFIG.PHOTO_MIN_FILES) {
      this.photoErrorMessage = `Debes subir al menos ${this.CONFIG.PHOTO_MIN_FILES} fotos`;
    }
  }
  //nueva posición de los archivos en la lista de archivos
  drop(event: CdkDragDrop<string[]>, type: MediaType): void {
    const media = this.mediaState[type];

    if (event.previousContainer === event.container) {
      moveItemInArray(media.files, event.previousIndex, event.currentIndex);
      moveItemInArray(media.previews, event.previousIndex, event.currentIndex);
    }
  }
  // Valida la cantidad de archivos y las dimensiones de la imagen y procesa los archivos
  private async processFiles(newFiles: File[], type: MediaType): Promise<void> {
    const media = this.mediaState[type];
    const maxFiles = type === 'photos' ? this.CONFIG.PHOTO_MAX_FILES : this.CONFIG.PLAN_MAX_FILES;

    if (this.validateFileCount(media.files.length + newFiles.length, maxFiles, type)) {
      for (const file of newFiles) {
        await this.processFile(file, type);
      }
    }
  }
  // Valida la cantidad de archivos que se pueden subir y muestra un mensaje de error si se excede
  private validateFileCount(totalCount: number, maxFiles: number, type: MediaType): boolean {
    if (totalCount > maxFiles) {
      this.setErrorMessage(type, `No puedes subir más de ${maxFiles} archivos`);
      return false;
    }
    return true;
  }
  // Procesa el archivo, valida el tipo y las dimensiones de la imagen y lo agrega a la lista de archivos
  private async processFile(file: File, type: MediaType): Promise<void> {
    if (!this.CONFIG.VALID_TYPES.includes(file.type)) {
      this.setErrorMessage(type, 'Solo se admiten archivos JPG y PNG');
      return;
    }

    try {
      const dimensions = await this.getImageDimensions(file);
      if (this.validateImageDimensions(dimensions, type)) {
        this.addFileToMedia(file, type);
      }
    } catch {
      this.setErrorMessage(type, 'Error al procesar la imagen');
    }
  }
  // Valida las dimensiones de la imagen y muestra un mensaje de error si se excede
  private validateImageDimensions(dimensions: ImageDimensions, type: MediaType): boolean {
    const { MIN_DIMENSIONS, MAX_DIMENSIONS } = this.CONFIG;

    if (dimensions.width < MIN_DIMENSIONS || dimensions.height < MIN_DIMENSIONS) {
      this.setErrorMessage(
        type,
        `La imagen debe tener al menos ${MIN_DIMENSIONS}x${MIN_DIMENSIONS} píxeles`
      );
      return false;
    }

    if (dimensions.width > MAX_DIMENSIONS || dimensions.height > MAX_DIMENSIONS) {
      this.setErrorMessage(
        type,
        `La imagen no puede exceder ${MAX_DIMENSIONS}x${MAX_DIMENSIONS} píxeles`
      );
      return false;
    }

    return true;
  }
  // Agrega el archivo a la lista de archivos
  private addFileToMedia(file: File, type: MediaType): void {
    const media = this.mediaState[type];
    media.files.push(file);
    media.previews.push(URL.createObjectURL(file));
    this.setErrorMessage(type, '');
  }
  // Muestra un mensaje de error
  private setErrorMessage(type: MediaType, message: string): void {
    this.mediaState[type].errorMessage = message;
  }
  // Obtiene las dimensiones de la imagen
  private getImageDimensions(file: File): Promise<ImageDimensions> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }
  //  Limpia las URL de los objetos URL
  private cleanupObjectURLs(): void {
    Object.values(this.mediaState).forEach((media) => {
      media.previews.forEach((url) => URL.revokeObjectURL(url));
    });
  }

  // Continuar al siguiente paso
  continue(): void {
    this.progressTrackerService.nextStep();
  }

  // Volver al paso anterior
  back(): void {
    this.progressTrackerService.backStep();
  }
}
