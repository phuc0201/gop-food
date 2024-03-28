import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisinesSliderComponent } from './cuisines-slider.component';

describe('CuisinesSliderComponent', () => {
  let component: CuisinesSliderComponent;
  let fixture: ComponentFixture<CuisinesSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuisinesSliderComponent]
    });
    fixture = TestBed.createComponent(CuisinesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
