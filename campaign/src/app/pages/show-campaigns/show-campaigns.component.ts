import { Component } from '@angular/core';

@Component({
  selector: 'app-show-campaigns',
  templateUrl: './show-campaigns.component.html',
  styleUrl: './show-campaigns.component.css'
})
export class ShowCampaignsComponent {
  products = [
    { image: 'assets/campaign.jpg', title: 'Camapign 1', description: 'Feed the hungry: Fighting Hunger One Meal at a Time' },
    { image: 'assets/campaign3.jpg', title: 'Camapign 2', description: 'Homeless Shelter Relief: Providing Shelter and Hope for the Homeless' },
    { image: 'assets/campaign4.jpg', title: 'Camapign 3', description: 'Education for Every Child: Empowering Future Generations Through Education' },
    { image: 'assets/campaign5.jpg', title: 'camapign 4', description: 'Medical Relief Fund: Healing Lives, Restoring Hope' },
    { image: 'assets/campaign6.jpg', title: 'camapign 5', description: 'Women Empowerment Project: Empowering Women, Changing Lives' },
    { image: 'assets/campaign5.jpg', title: 'camapign 6', description: 'Cancer Research Fund: Fighting Cancer, One Breakthrough at a Time' },
    { image: 'assets/campaign3.jpg', title: 'camapign 7', description: 'Supporting Refugees: Offering Hope, Building Bridges' },
    { image: 'assets/campaign.jpg', title: 'camapign 8', description: 'Homeless Shelter Relief: Providing Shelter and Hope for the Homeless' },
    { image: 'assets/campaign6.jpg', title: 'camapign 9', description: 'Education for Every Child: Empowering Future Generations Through Education' },
    { image: 'assets/campaign4.jpg', title: 'camapign 10', description: 'Medical Relief Fund: Healing Lives, Restoring Hope' },
  ];

  page = 1;
  pageSize = 6;

  get paginatedProducts() {
    const startIndex = (this.page - 1) * this.pageSize;
    return this.products.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.page = page;
  }

}
