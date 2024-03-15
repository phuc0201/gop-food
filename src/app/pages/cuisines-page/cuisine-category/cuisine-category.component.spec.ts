import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineCategoryComponent } from './cuisine-category.component';

describe('CuisineCategoryComponent', () => {
  let component: CuisineCategoryComponent;
  let fixture: ComponentFixture<CuisineCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuisineCategoryComponent]
    });
    fixture = TestBed.createComponent(CuisineCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
