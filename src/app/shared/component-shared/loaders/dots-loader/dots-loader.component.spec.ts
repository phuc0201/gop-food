import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotsLoaderComponent } from './dots-loader.component';

describe('DotsLoaderComponent', () => {
  let component: DotsLoaderComponent;
  let fixture: ComponentFixture<DotsLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DotsLoaderComponent]
    });
    fixture = TestBed.createComponent(DotsLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
