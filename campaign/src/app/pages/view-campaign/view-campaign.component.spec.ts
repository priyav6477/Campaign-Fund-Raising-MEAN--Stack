import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCampaignComponent } from './view-campaign.component';

describe('ViewCampaignComponent', () => {
  let component: ViewCampaignComponent;
  let fixture: ComponentFixture<ViewCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCampaignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
