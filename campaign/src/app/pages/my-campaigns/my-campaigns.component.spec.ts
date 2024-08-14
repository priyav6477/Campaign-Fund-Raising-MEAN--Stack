import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCampaignsComponent } from './my-campaigns.component';

describe('MyCampaignsComponent', () => {
  let component: MyCampaignsComponent;
  let fixture: ComponentFixture<MyCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCampaignsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
