import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderStickyLayoutComponent } from './header-sticky-layout.component';

describe('HeaderStickyLayoutComponent', () => {
  let component: HeaderStickyLayoutComponent;
  let fixture: ComponentFixture<HeaderStickyLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderStickyLayoutComponent]
    });
    fixture = TestBed.createComponent(HeaderStickyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
