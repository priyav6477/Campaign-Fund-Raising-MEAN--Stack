import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PayPalButtonsComponent } from '@paypal/paypal-js';
import { EncryptionService } from '../../service/encryption.service';
import { CampaignService } from '../../service/campaign.service';
import { UserCampaignService } from '../../service/user-campaign.service';
import { SnackbarService } from '../../snackbar-service.service';

@Component({
  selector: 'app-donate-now',
  templateUrl: './donate-now.component.html',
  styleUrls: ['./donate-now.component.css']
})
export class DonateNowComponent implements OnInit, OnDestroy {
  amount: number = 1;
  encryptedCampaignId!: string;
  decryptedCampaignId!: string;
  description: any;
  campaign: any;
  paypalButtonsInstance: any; 
  userId!: string;

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

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
          this.campaign = campaign.result.image;
          console.log('Campaign details:', this.campaign);
          this.description = campaign.result.description;
        },
        (error) => {
          console.error('Error fetching campaign details:', error);
      
        }
      );
    });

    
    this.renderPayPalButtons();
  }

  ngOnDestroy(): void {
    if (this.paypalButtonsInstance) {
      this.paypalButtonsInstance.close(); 
      this.paypalButtonsInstance = null;
    }
  }

  renderPayPalButtons(): void {
    if (window.paypal && !this.paypalButtonsInstance) {
      this.paypalButtonsInstance = window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.amount.toFixed(2)
                }
              }
            ]
          });
        },
        onApprove: (data: any, actions: any) => {
          console.log(data)
          return actions.order.capture().then((details: any) => {
            console.log('Transaction completed by ' + details.payer.name.given_name);
           
            this.userService.donate(this.userId,this.decryptedCampaignId, this.amount).subscribe((data:any)=>{
              console.log(data)
              this.snackbar.snackbarDisplay(data.message)
              
            })



          });
        },
        onError: (err: any) => {
          console.error('Error during PayPal payment:', err);
        
        }
      });

      this.paypalButtonsInstance.render(this.paymentRef.nativeElement);
    }
  }

  updateAmount(newAmount: number): void {
    this.amount = newAmount;
  
    if (this.paypalButtonsInstance) {
      this.paypalButtonsInstance.close().then(() => {
        this.paypalButtonsInstance = null;
        this.renderPayPalButtons(); 
      });
    } else {
      this.renderPayPalButtons();
    }
  }

  openFaq(): void {
    this.router.navigateByUrl('/campaign/faq');
  }
}