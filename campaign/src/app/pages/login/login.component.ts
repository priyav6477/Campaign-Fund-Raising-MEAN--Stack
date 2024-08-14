import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../../user-service.service';
import { SnackbarService } from '../../snackbar-service.service';
import { UserCampaignService } from '../../service/user-campaign.service';
import { CampaignService } from '../../service/campaign.service';
import { EncryptionService } from '../../service/encryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  error!:string
  constructor(private fb: FormBuilder, private router: Router,
    private userService: UserServiceService, private snackbarService: SnackbarService, private userCampaignService: UserCampaignService, private campaignService: CampaignService, private encryptionService: EncryptionService) {
    sessionStorage.clear();
  }


  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.userService.loginUser(this.form.value).subscribe(
        response => {
          console.log(response)
          sessionStorage.setItem('userDetails', JSON.stringify(response.result));
          this.router.navigate(['campaign/home']);
        },
        error => {
          // this.snackbarService.snackbarDisplay('Login failed');
          this.error="Invalid credentials. Please check the details"

        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }


  [x: string]: any;
  sections = [
    { id: 'login', name: 'Login', active: false },
  ];



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
}
