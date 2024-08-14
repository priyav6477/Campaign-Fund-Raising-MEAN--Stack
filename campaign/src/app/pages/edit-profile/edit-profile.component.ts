import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../snackbar-service.service';
import { UserServiceService } from '../../user-service.service';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {


  individualForm: FormGroup;
  organizationForm: FormGroup;

  userDetails: any;

  constructor(private fb: FormBuilder, private router: Router, private snackbarService: SnackbarService, private userService: UserService) {

    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails') as any)
    console.log(this.userDetails);

    this.individualForm = this.fb.group({
      name: [this.userDetails.name, Validators.required],
      email: [this.userDetails.email, [Validators.required, Validators.email]],
      dob: [this.userDetails.dob, Validators.required],
      age: [this.userDetails.age, Validators.required],
      guardianNumber: [this.userDetails.guardianNumber],
      guardianEmail: [this.userDetails.guardianEmail],
      mobileNumber: [this.userDetails.mobileNumber, Validators.required],
      gender: [this.userDetails.gender, Validators.required]
    });

    this.organizationForm = this.fb.group({
      name: [this.userDetails.name, Validators.required],
      email: [this.userDetails.email, [Validators.required, Validators.email]],
      authorityPhone: [this.userDetails.authorityPhone, Validators.required],
      authorityName: [this.userDetails.authorityName, Validators.required],
      authorityDOB: [this.userDetails.authorityDOB, Validators.required]
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
      if (age < 18) {
        this.individualForm.get('guardianNumber')?.setValidators(Validators.required);
        this.individualForm.get('guardianNumber')?.updateValueAndValidity();
        this.individualForm.get('guardianEmail')?.setValidators(Validators.required);
        this.individualForm.get('guardianEmail')?.updateValueAndValidity();
      } else {
        this.individualForm.get('guardianNumber')?.clearValidators();
        this.individualForm.get('guardianNumber')?.updateValueAndValidity();
        this.individualForm.get('guardianEmail')?.clearValidators();
        this.individualForm.get('guardianEmail')?.updateValueAndValidity();
      }
    }
  }

  onSubmit() {
    if (this.userDetails.role == 'Individual' && this.individualForm.valid) {
      let id = this.userDetails._id;
      let form = this.individualForm.getRawValue()
      console.log(form);
      this.userService.updateUser(id, form).subscribe(data => {
        console.log(data)
        if(data.status){
          sessionStorage.setItem('userDetails',JSON.stringify(data.result))
        }
        this.router.navigateByUrl('/campaign/home')

      })
    }
    if (this.userDetails.role == 'Organization' && this.organizationForm.valid) {
      let id = this.userDetails._id
      let form = this.organizationForm.getRawValue()
      console.log(form);
    }
  }
}
