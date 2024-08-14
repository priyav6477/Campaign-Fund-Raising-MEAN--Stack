import { Component, OnInit } from '@angular/core';
import { UserCampaignService } from '../../service/user-campaign.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { EncryptionService } from '../../service/encryption.service';

@Component({
  selector: 'app-my-campaigns',
  templateUrl: './my-campaigns.component.html',
  styleUrl: './my-campaigns.component.css'
})
export class MyCampaignsComponent implements OnInit {
  campaignId!:string
  user: User;
  campaigns: any[] = [];
  constructor(private userCampaignService: UserCampaignService,private router: Router,
    private encryptionService: EncryptionService ) {
    this.user = JSON.parse(sessionStorage.getItem('userDetails') as any);
  }

  ngOnInit(): void {
    this.userCampaignService.getUserCampaigns(this.user._id).subscribe(data => {
      if (data.status) {
        this.campaigns = data.result
      }
    })
  }

  page = 1;
  pageSize = 6;

  get paginatedProducts() {
    const startIndex = (this.page - 1) * this.pageSize;
    return this.campaigns.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.page = page;
  }

  // donate(campaign: any) {
  //  console.log(campaign._id)
  // }

  donate(campaign: any) {
    console.log(campaign)
    this.campaignId=campaign.campaignId._id
    const encryptedId = this.encryptionService.encrypt(this.campaignId);
    this.router.navigate(['campaign/donate', encryptedId]);
  }
}
