import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCampaignService } from '../../service/user-campaign.service';
import { CampaignService } from '../../service/campaign.service';
import { EncryptionService } from '../../service/encryption.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrl: './core.component.css'
})
export class CoreComponent implements OnInit{
[x: string]: any;
  campaignId!:string

  campaigns: any[] = [];
  sections = [
    { id: 'home', name: 'Home', active: false },
    { id: 'about', name: 'About', active: false },
    { id: 'campaigns', name: 'Campaigns', active: false },
  ];
  constructor(private router: Router,private userCampaignService:UserCampaignService,private campaignService: CampaignService,private encryptionService: EncryptionService){}
  ngOnInit(): void {
    this.getTotalDonation();
    this.getValidCampaigns();
  }

  getValidCampaigns() {
    this.campaignService.getValidCampaigns().subscribe(data => {
      if(data.status){
        this.campaigns = data.result
      }
    })
  }

  knowMore(campaign: any) {
    console.log(campaign);
    this.campaignId = campaign._id;
    const encryptedId = this.encryptionService.encrypt(this.campaignId);
    this.router.navigate(['description', encryptedId]);
  }
  // scrollToAboutSection() {
  //   this.router.navigate([], { fragment: '/about' });
  // }

  getTotalDonation(){
    this.userCampaignService.getTotalDonation().subscribe(data=>{
      console.log(data);
      this.totalDonation=data.result.totalDonationAmount
    })
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    for (let i = 0; i < this.sections.length; i++) {
      const section = document.getElementById(this.sections[i].id);
      if (section) {
        const offset = section.offsetTop - 50; // Adjusted offset for better UX
        if (scrollPosition >= offset) {
          this.sections.forEach(s => s.active = false); // Clear all active states
          this.sections[i].active = true; // Set active state to the current section
        }
      }
    }
  }

  navigateToJoin() {
    this.router.navigate(['/login']); 
  }

  page = 1;
  pageSize = 6;

  totalDonation:number=0;

  get paginatedProducts() {
    const startIndex = (this.page - 1) * this.pageSize;
    return this.campaigns.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.page = page;
  }
}
