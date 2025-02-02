import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusTrackerComponent } from './order-status-tracker.component';

describe('OrderStatusTrackerComponent', () => {
  let component: OrderStatusTrackerComponent;
  let fixture: ComponentFixture<OrderStatusTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderStatusTrackerComponent]
    });
    fixture = TestBed.createComponent(OrderStatusTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
