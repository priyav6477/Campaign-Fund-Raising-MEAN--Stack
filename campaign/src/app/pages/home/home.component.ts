import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../service/campaign.service';
import { User } from '../../model/user';
import { UserCampaignService } from '../../service/user-campaign.service';
import { Router } from '@angular/router';
import { EncryptionService } from '../../service/encryption.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  campaignId!:string

  campaigns: any[] = [];
  user: User;
  constructor(private campaignService: CampaignService,  private encryptionService: EncryptionService, private userCampaignService:UserCampaignService,private router:Router) {
    this.user = JSON.parse(sessionStorage.getItem('userDetails') as any)
  }
  ngOnInit(): void {
    this.getValidCampaigns();
  }

  getValidCampaigns() {
    this.campaignService.getValidCampaigns().subscribe(data => {
      if(data.status){
        this.campaigns = data.result
      }
    })
  }

  registerForCampaign(campaign: any) {
    console.log(campaign)
    this.userCampaignService.registerToCampaign(this.user._id,campaign._id).subscribe(data=>{
      console.log(data)
      if(data.status)
      this.router.navigateByUrl('/campaign/my-campaigns')
    })

  }


  knowMore(campaign: any) {
    console.log(campaign)
    this.campaignId=campaign._id
    const encryptedId = this.encryptionService.encrypt(this.campaignId);
    this.router.navigate(['campaign/description', encryptedId]);

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
}
