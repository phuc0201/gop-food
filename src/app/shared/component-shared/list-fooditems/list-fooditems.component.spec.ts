import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFooditemsComponent } from './list-fooditems.component';

describe('ListFooditemsComponent', () => {
  let component: ListFooditemsComponent;
  let fixture: ComponentFixture<ListFooditemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFooditemsComponent]
    });
    fixture = TestBed.createComponent(ListFooditemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
