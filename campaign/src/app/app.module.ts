import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MasterModule } from './template/master.module';
import { LoginComponent } from './pages/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './pages/home/home.component';
import { ViewCampaignComponent } from './pages/view-campaign/view-campaign.component';
import { ListCampaignsComponent } from './pages/list-campaigns/list-campaigns.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ShowCampaignsComponent } from './pages/show-campaigns/show-campaigns.component';
import { CoreComponent } from './template/core/core.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxPayPalModule } from 'ngx-paypal';
import { DescriptionComponent } from './pages/description/description.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ViewCampaignComponent,
    ListCampaignsComponent,
    RegistrationComponent,
    ShowCampaignsComponent,
    CoreComponent
  ],
  imports: [
    BrowserModule,
    MatRadioModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MasterModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatNativeDateModule,
    NgxPayPalModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
