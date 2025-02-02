import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineFilterComponent } from './cuisine-filter.component';

describe('CuisineFilterComponent', () => {
  let component: CuisineFilterComponent;
  let fixture: ComponentFixture<CuisineFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuisineFilterComponent]
    });
    fixture = TestBed.createComponent(CuisineFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
