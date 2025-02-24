import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationEvent } from '@angular/animations';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('notificationState', [
      state(
        'void',
        style({
          transform: 'translateX(100%)',
          opacity: 0,
        })
      ),
      state(
        'visible',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      state(
        'hidden',
        style({
          transform: 'translateX(100%)',
          opacity: 0,
        })
      ),
      transition(
        'void => visible',
        animate('150ms cubic-bezier(0, 0, 0.2, 1)')
      ),
      transition(
        'visible => hidden',
        animate('150ms cubic-bezier(0.4, 0, 1, 1)')
      ),
    ]),
  ],
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() autoClose = true;
  @Input() duration = 5000;
  @Output() closed = new EventEmitter<void>();

  visible = true;
  progress = 100;
  private timeoutId?: number;
  private progressInterval?: number;

  ngOnInit() {
    if (this.autoClose) {
      this.startAutoCloseTimer();
      this.startProgressBar();
    }
    this.message = 'Hello World';
  }

  /**
   * el tiempo de espera para cerrar la notificación
   * se reinicia cada vez que el usuario pasa el mouse sobre la notificación
   */
  ngOnDestroy() {
    this.clearTimers();
  }

  /**
   * Comienza el temporizador para cerrar la notificación automáticamente.
   */
  private startAutoCloseTimer() {
    if (this.autoClose) {
      this.timeoutId = window.setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  /**
   * Comienza la barra de progreso de la notificación.
   * La barra de progreso disminuye de 100% a 0% durante la duración especificada,
   * actualizando cada 10 milisegundos.
   */
  private startProgressBar() {
    const intervalDuration = 10;
    const steps = this.duration / intervalDuration;
    const decrementPerStep = 100 / steps;

    this.progressInterval = window.setInterval(() => {
      this.progress = Math.max(0, this.progress - decrementPerStep);
    }, intervalDuration);
  }

  /**
   * Borra los temporizadores que se han creado para cerrar la notificación automáticamente
   */
  private clearTimers() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  /**
   * Cierra la notificación y borra los temporizadores que se han creado
   * para cerrar la notificación automáticamente y para mostrar la barra de progreso.
   */
  close() {
    this.visible = false;
    this.clearTimers();
  }

  /**
   * cuando el usuario pasa el mouse sobre la notificación,
   * evita que la notificación se cierre automáticamente.
   */
  onMouseEnter() {
    this.clearTimers();
    this.progress = 100;
  }

  /**
   * Si el usuario sale del mouse de la notificación y se ha
   * establecido un valor para el parámetro autoClose, se
   * comienza el temporizador para cerrar la notificación
   * automáticamente y se muestra la barra de progreso.
   */
  onMouseLeave() {
    if (this.autoClose) {
      this.startAutoCloseTimer();
      this.startProgressBar();
    }
  }

  /**
   * Este método se llama cuando la animación de la notificación ha terminado.
   * Si el estado final de la animación es 'hidden', se emite el evento closed.
   * @param event Evento de animación que se ha producido.
   */
  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'hidden') {
      this.closed.emit();
    }
  }

  /**
   * Retorna el icono SVG correspondiente al tipo de notificación.
   * el icono se muestra en la parte izquierda de la notificación.
   * @returns {string} Icono SVG correspondiente al tipo de notificación.
   */
  getIcon(): string {
    const icons = {
      success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      error:
        'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
      warning:
        'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    };
    return icons[this.type];
  }
}
