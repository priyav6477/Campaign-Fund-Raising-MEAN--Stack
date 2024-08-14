import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
  user: any; // Define user property

  @Output() closeSideNav = new EventEmitter();
  constructor() { }

  onToggleClose() {
    this.closeSideNav.emit();
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('userDetails') as any);
  }
}
