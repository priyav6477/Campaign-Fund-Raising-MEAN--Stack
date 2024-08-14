import { Component } from '@angular/core';

@Component({
  selector: 'app-navtabs',
  templateUrl: './navtabs.component.html',
  styleUrls: ['./navtabs.component.css']
})
export class NavtabsComponent {
  userType!: string;

  constructor() {
    let user = sessionStorage.getItem('userDetails');
    if (user) {
      let userObject = JSON.parse(user);
      this.userType = userObject.role
    }


  }
}
