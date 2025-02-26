import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressVerticalComponent } from './progress-vertical.component';

describe('ProgressVerticalComponent', () => {
  let component: ProgressVerticalComponent;
  let fixture: ComponentFixture<ProgressVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressVerticalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
