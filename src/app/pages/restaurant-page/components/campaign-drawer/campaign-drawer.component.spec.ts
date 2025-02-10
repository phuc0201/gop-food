import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDrawerComponent } from './campaign-drawer.component';

describe('CampaignDrawerComponent', () => {
  let component: CampaignDrawerComponent;
  let fixture: ComponentFixture<CampaignDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignDrawerComponent]
    });
    fixture = TestBed.createComponent(CampaignDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
