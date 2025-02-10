import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantInfoDetailsComponent } from './restaurant-info-details.component';

describe('RestaurantInfoDetailsComponent', () => {
  let component: RestaurantInfoDetailsComponent;
  let fixture: ComponentFixture<RestaurantInfoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantInfoDetailsComponent]
    });
    fixture = TestBed.createComponent(RestaurantInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
