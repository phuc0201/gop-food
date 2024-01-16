import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerCartComponent } from './drawer-cart.component';

describe('DrawerCartComponent', () => {
  let component: DrawerCartComponent;
  let fixture: ComponentFixture<DrawerCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrawerCartComponent]
    });
    fixture = TestBed.createComponent(DrawerCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
