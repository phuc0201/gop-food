import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSliderComponent } from './campaign-slider.component';

describe('CampaignSliderComponent', () => {
  let component: CampaignSliderComponent;
  let fixture: ComponentFixture<CampaignSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignSliderComponent]
    });
    fixture = TestBed.createComponent(CampaignSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
