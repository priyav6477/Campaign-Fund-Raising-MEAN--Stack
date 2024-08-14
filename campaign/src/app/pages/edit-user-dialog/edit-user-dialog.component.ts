import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/user';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.css'
})
export class EditUserDialogComponent {
  userForm!: FormGroup;
  orgForm!: FormGroup;
  userData: User;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) data: User, public dialogRef: MatDialogRef<EditUserDialogComponent>) {
    console.log(data);
    this.userData = data;
    this.userForm = this.fb.group({
      name: [data.name, Validators.required],
      email: [data.email, Validators.required],
      dob: [data.dob, Validators.required],
      age: [data.age, Validators.required],
      guardianNumber: [data.guardianNumber],
      guardianEmail: [data.guardianEmail],
      mobileNumber: [data.mobileNumber, Validators.required],
      gender: [data.gender, Validators.required]
    });

    this.orgForm = this.fb.group({
      name: [data.name, Validators.required],
      email: [data.email, Validators.required],
      authorityPhone: [data.authorityPhone, Validators.required],
      authorityName: [data.authorityName, Validators.required],
      authorityDOB: [data.authorityDOB, Validators.required],
    });
  }

  submit() {
    if (this.userData.role == 'Individual' && this.userForm.valid) {
      this.dialogRef.close({
        clicked: 'submit',
        id: this.userData._id,
        form: this.userForm.getRawValue(),
      });
    }
    if (this.userData.role == 'Organization' && this.orgForm.valid) {
      this.dialogRef.close({
        clicked: 'submit',
        id: this.userData._id,
        form: this.orgForm.getRawValue(),
      });
    }



  }
}
