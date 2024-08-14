import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../service/campaign.service';
import { EncryptionService } from '../../service/encryption.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserCampaignService } from '../../service/user-campaign.service';
import { SnackbarService } from '../../snackbar-service.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent implements OnInit {
  campaigns: any[] = [];
  encryptedCampaignId!: string;
  decryptedCampaignId!: string;
  description: any;
  campaign: any;
  userId!: string;
  campImg:any

  constructor(
    private route: ActivatedRoute,
    private encryptionService: EncryptionService,
    private router: Router,
    private campaignService: CampaignService,
    private userService: UserCampaignService,
    private snackbar:SnackbarService

  ) { 
    const userDetails= JSON.parse(sessionStorage.getItem('userDetails')as any)
    this.userId = userDetails._id;
  }
ngOnInit(): void {
  this.route.params.subscribe((params: Params) => {
    this.encryptedCampaignId = params['id'];
  
    this.decryptedCampaignId = this.encryptionService.decrypt(this.encryptedCampaignId);
    console.log('Decrypted Campaign ID:', this.decryptedCampaignId);
    this.campaignService.getCampaignById(this.decryptedCampaignId).subscribe(
      (campaign: any) => {
        console.log(campaign);
        this.campaign = campaign.result;
        this.campImg = campaign.result.image;

        console.log('Campaign details:', this.campaign);
       
      },
      (error) => {
        console.error('Error fetching campaign details:', error);
    
      }
    );
  });

  

}
  // getValidCampaigns() {
  //   this.campaignService.getValidCampaigns().subscribe(data => {
  //     if(data.status){
  //       this.campaigns = data.result
  //       console.log(this.campaigns)
  //     }
  //   })
  // }
}
