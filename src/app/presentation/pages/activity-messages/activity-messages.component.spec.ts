import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityMessagesComponent } from './activity-messages.component';

describe('ActivityMessagesComponent', () => {
  let component: ActivityMessagesComponent;
  let fixture: ComponentFixture<ActivityMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
