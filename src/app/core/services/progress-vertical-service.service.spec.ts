import { TestBed } from '@angular/core/testing';

import { ProgressVerticalServiceService } from './progress-vertical-service.service';

describe('ProgressVerticalServiceService', () => {
  let service: ProgressVerticalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressVerticalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
