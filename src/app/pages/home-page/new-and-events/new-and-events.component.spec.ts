import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAndEventsComponent } from './new-and-events.component';

describe('NewAndEventsComponent', () => {
  let component: NewAndEventsComponent;
  let fixture: ComponentFixture<NewAndEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAndEventsComponent]
    });
    fixture = TestBed.createComponent(NewAndEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
