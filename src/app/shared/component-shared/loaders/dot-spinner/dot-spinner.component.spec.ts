import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotSpinnerComponent } from './dot-spinner.component';

describe('DotSpinnerComponent', () => {
  let component: DotSpinnerComponent;
  let fixture: ComponentFixture<DotSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DotSpinnerComponent]
    });
    fixture = TestBed.createComponent(DotSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
