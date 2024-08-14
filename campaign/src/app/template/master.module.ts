import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from '../app-routing.module';
import { MasterComponent } from './master/master.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import {  NavtabsComponent } from './navatbs/navtabs.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { CreateCampaignComponent } from '../pages/create-campaign/create-campaign.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { UsersComponent } from '../pages/users/users.component';
import { ConfirmDialogComponent } from '../pages/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../pages/edit-user-dialog/edit-user-dialog.component';
import { MyCampaignsComponent } from '../pages/my-campaigns/my-campaigns.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditProfileComponent } from '../pages/edit-profile/edit-profile.component';
import { FaqComponent } from '../pages/faq/faq.component';
import { DonateNowComponent } from '../pages/donate-now/donate-now.component';
import { DescriptionComponent } from '../pages/description/description.component';


@NgModule({
  declarations: [
    MasterComponent,
    ToolbarComponent,
    SidenavListComponent,
    NavtabsComponent,
    CreateCampaignComponent,
    UsersComponent,
    ConfirmDialogComponent,
    EditUserDialogComponent,
    MyCampaignsComponent,
    EditProfileComponent,
    FaqComponent,
    DonateNowComponent,
    DescriptionComponent
 
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTabsModule,
    AppRoutingModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatSidenavModule,
    NgxMatTimepickerModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSortModule,
    MatPaginatorModule,
    NgxPayPalModule,
    CKEditorModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MasterModule { }
