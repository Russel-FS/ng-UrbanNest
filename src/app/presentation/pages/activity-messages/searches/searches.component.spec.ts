import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchesComponent } from './searches.component';

describe('SearchesComponent', () => {
  let component: SearchesComponent;
  let fixture: ComponentFixture<SearchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
