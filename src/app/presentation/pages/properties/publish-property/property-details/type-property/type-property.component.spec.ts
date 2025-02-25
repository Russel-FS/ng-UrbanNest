import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePropertyComponent } from './type-property.component';

describe('TypePropertyComponent', () => {
  let component: TypePropertyComponent;
  let fixture: ComponentFixture<TypePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypePropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
