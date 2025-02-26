import { TestBed } from '@angular/core/testing';

import { ProgressTrackerServiceService } from './progress-tracker-service.service';

describe('ProgressTrackerServiceService', () => {
  let service: ProgressTrackerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressTrackerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
