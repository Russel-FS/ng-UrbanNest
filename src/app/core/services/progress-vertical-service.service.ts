import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressVerticalServiceService {
  private progressNextSource = new Subject<void>();
  progressNextStep$ = this.progressNextSource.asObservable();

  private progressBackSource = new Subject<void>();
  progressBackStep$ = this.progressBackSource.asObservable();

  constructor() {}

  nextStep(): void {
    this.progressNextSource.next();
  }

  backStep(): void {
    this.progressBackSource.next();
  }
}
