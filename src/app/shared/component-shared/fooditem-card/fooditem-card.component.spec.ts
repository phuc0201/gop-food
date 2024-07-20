import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooditemCardComponent } from './fooditem-card.component';

describe('FooditemCardComponent', () => {
  let component: FooditemCardComponent;
  let fixture: ComponentFixture<FooditemCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooditemCardComponent]
    });
    fixture = TestBed.createComponent(FooditemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
