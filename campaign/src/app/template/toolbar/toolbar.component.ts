import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserCampaignService } from '../../service/user-campaign.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: User
  myDonation:number=0;
  constructor(private userCampaignService: UserCampaignService) {
    this.user = JSON.parse(sessionStorage.getItem('userDetails') as any)
  }

  ngOnInit(): void {
    this.userCampaignService.getUserDonation(this.user._id).subscribe(data => {
      if(data.status){
        this.myDonation=data.result.totalDonationAmount;
      }
    })
  }

  @Output() SideNavToggle = new EventEmitter();

  openSidenav() {
    this.SideNavToggle.emit();
  }
}
