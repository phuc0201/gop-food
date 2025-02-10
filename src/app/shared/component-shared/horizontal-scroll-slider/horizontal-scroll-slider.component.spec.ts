import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalScrollSliderComponent } from './horizontal-scroll-slider.component';

describe('HorizontalScrollSliderComponent', () => {
  let component: HorizontalScrollSliderComponent;
  let fixture: ComponentFixture<HorizontalScrollSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalScrollSliderComponent]
    });
    fixture = TestBed.createComponent(HorizontalScrollSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
