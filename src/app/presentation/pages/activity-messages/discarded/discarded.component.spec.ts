import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardedComponent } from './discarded.component';

describe('DiscardedComponent', () => {
  let component: DiscardedComponent;
  let fixture: ComponentFixture<DiscardedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscardedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscardedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
