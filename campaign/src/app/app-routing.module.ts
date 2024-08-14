import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MasterComponent } from './template/master/master.component';
import { HomeComponent } from './pages/home/home.component';
import { ListCampaignsComponent } from './pages/list-campaigns/list-campaigns.component';
import { ViewCampaignComponent } from './pages/view-campaign/view-campaign.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { DonateNowComponent } from './pages/donate-now/donate-now.component';
import { CoreComponent } from './template/core/core.component';
import { CreateCampaignComponent } from './pages/create-campaign/create-campaign.component';
import { UsersComponent } from './pages/users/users.component';
import { MyCampaignsComponent } from './pages/my-campaigns/my-campaigns.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { FaqComponent } from './pages/faq/faq.component';
import { DescriptionComponent } from './pages/description/description.component';

const routes: Routes = [
  { path: '', redirectTo:'/core',pathMatch:'full' },
  { path: 'core', component: CoreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },

  { path: 'description/:id', component: DescriptionComponent },

  {
    path: "campaign", component: MasterComponent,
    children: [
      { path: '', component: HomeComponent },

      { path: 'home', component: HomeComponent },
      { path: 'display-all', component: ListCampaignsComponent },
      { path: 'view', component: ViewCampaignComponent },
      // { path: 'donate', component: DonateNowComponent },
      { path: 'donate/:id', component: DonateNowComponent },
      { path: 'create', component: CreateCampaignComponent },
      { path: 'manage-users', component: UsersComponent },
      { path: 'my-campaigns', component: MyCampaignsComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'description/:id', component: DescriptionComponent },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
