import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDrawerComponent } from './review-drawer.component';

describe('ReviewDrawerComponent', () => {
  let component: ReviewDrawerComponent;
  let fixture: ComponentFixture<ReviewDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewDrawerComponent]
    });
    fixture = TestBed.createComponent(ReviewDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
