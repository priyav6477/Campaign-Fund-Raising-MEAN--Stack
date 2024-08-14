import { TestBed } from '@angular/core/testing';

import { UserCampaignService } from './user-campaign.service';

describe('UserCampaignService', () => {
  let service: UserCampaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
