import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisinesComponent } from './cuisines.component';

describe('CuisinesComponent', () => {
  let component: CuisinesComponent;
  let fixture: ComponentFixture<CuisinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuisinesComponent]
    });
    fixture = TestBed.createComponent(CuisinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
