import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../../user-service.service';
import { SnackbarService } from '../../snackbar-service.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  individualForm: FormGroup;
  organizationForm: FormGroup;
  userType: string = 'Individual';
error!:string
  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router, private snackbarService: SnackbarService) {
    this.individualForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      age: ['', Validators.required],
      guardianNumber: [''],
      guardianEmail: [''],
      mobileNumber: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.organizationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      authorityPhone: ['', Validators.required],
      authorityName: ['', Validators.required],
      authorityDOB: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.onPasswordChanges();
  }

  ngOnInit(): void {
  }
  guardianForm: boolean = false
  onUserTypeChange(event: any): void {
    this.userType = event.value;
  }

  onPasswordChanges(): void {
    this.individualForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      if (this.individualForm.get('password')?.value !== this.individualForm.get('confirmPassword')?.value) {
        this.individualForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      } else {
        this.individualForm.get('confirmPassword')?.setErrors(null);
      }
    });

    this.organizationForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      if (this.organizationForm.get('password')?.value !== this.organizationForm.get('confirmPassword')?.value) {
        this.organizationForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      } else {
        this.organizationForm.get('confirmPassword')?.setErrors(null);
      }
    });
  }


  selectedDate: any
  calculateAge(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value; // Update selectedDate with the chosen date
    // Calculate age
    if (this.selectedDate) {
      const today = new Date();
      const birthDate = new Date(this.selectedDate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.individualForm.get('age')?.setValue(age)
      if(age<18){
        this.guardianForm=true;
        this.individualForm.get('guardianNumber')?.setValidators(Validators.required);
        this.individualForm.get('guardianNumber')?.updateValueAndValidity();
        this.individualForm.get('guardianEmail')?.setValidators(Validators.required);
        this.individualForm.get('guardianEmail')?.updateValueAndValidity();
      }else{
        this.guardianForm=false;
        this.individualForm.get('guardianNumber')?.clearValidators();
        this.individualForm.get('guardianNumber')?.updateValueAndValidity();
        this.individualForm.get('guardianEmail')?.clearValidators();
        this.individualForm.get('guardianEmail')?.updateValueAndValidity();
      }
    }
  }

  onSubmit(): void {
    console.log(this.individualForm.valid);
    if (this.userType === 'Individual' && this.individualForm.valid) {
      const formData = {
        role: 'Individual',
        name: this.individualForm.get('name')?.value,
        email: this.individualForm.get('email')?.value,
        password: this.individualForm.get('password')?.value,
        dob: new Date(this.individualForm.get('dob')?.value).toISOString(), // Format date as needed
        age: this.individualForm.get('age')?.value,
        guardianNumber:this.individualForm.get('guardianNumber')?.value,
        guardianEmail:this.individualForm.get('guardianEmail')?.value,
        mobileNumber: this.individualForm.get('mobileNumber')?.value,
        gender: this.individualForm.get('gender')?.value,
      };

      this.userService.registerUser(formData).subscribe(
        (res) => {
          // this.snackbarService.snackbarDisplay('Registration successful ');
          this.router.navigate(['/login']);
          // this.router.navigate(['campaign/home']);
        },
        (err) => {
          console.log(err)
this.error="Registration Failed. Please check the details"
        }
      );
    } else if (this.userType === 'Organization' && this.organizationForm.valid) {
      const formData = {
        role: 'Organization',
        name: this.organizationForm.get('name')?.value,
        email: this.organizationForm.get('email')?.value,
        password: this.organizationForm.get('password')?.value,
        authorityPhone: this.organizationForm.get('authorityPhone')?.value,
        authorityName: this.organizationForm.get('authorityName')?.value,
        authorityDOB: this.organizationForm.get('authorityDOB')?.value
      };

      this.userService.registerUser(formData).subscribe(
        (res) => {
          this.router.navigate(['/login']);
        },
        (err) => {
          // this.snackbarService.snackbarDisplay('Registration failed ');
        }
      );
    } else {
      if(this.userType === 'Individual') {
        this.individualForm.markAllAsTouched();
      } else {
        this.organizationForm.markAllAsTouched();
      }
    }
  }

  [x: string]: any;
  sections = [
    { id: 'register', name: 'Register', active: false },
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
