import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressTrackerServiceService {
  // Observable para avanzar un paso
  private progressNextSource = new Subject<void>();
  progressNextStep$ = this.progressNextSource.asObservable();

  // Observable para retroceder un paso
  private progressBackSource = new Subject<void>();
  progressBackStep$ = this.progressBackSource.asObservable();
  
  // Variable para almacenar el paso actual máximo alcanzado
  private maxReachedStep = new BehaviorSubject<number>(1);
  maxReachedStep$ = this.maxReachedStep.asObservable();

  constructor() {}
  /**
   * Cambia al siguiente paso y actualiza el paso máximo alcanzado.
   */
  nextStep(): void {
    this.progressNextSource.next();
    const currentMax = this.maxReachedStep.value;
    this.maxReachedStep.next(Math.max(currentMax, currentMax + 1));
  }
  /**
   * Cambia al paso anterior.
   */
  backStep(): void {
    this.progressBackSource.next();
  }
 
  /**
   * Actualiza el paso máximo alcanzado.
   * @param step el número del paso alcanzado
   */
  updateMaxStep(step: number): void {
    const currentMax = this.maxReachedStep.value;
    this.maxReachedStep.next(Math.max(currentMax, step));
  }
  /**
   * Obtiene el paso máximo alcanzado.
   * @returns el número del paso máximo alcanzado
   */
  getMaxReachedStep(): number {
    return this.maxReachedStep.value;
  }
}
