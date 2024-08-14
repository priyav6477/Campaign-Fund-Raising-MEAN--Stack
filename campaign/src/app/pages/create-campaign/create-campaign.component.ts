import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignService } from '../../service/campaign.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Editor } from 'ckeditor5';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrl: './create-campaign.component.css'
})
export class CreateCampaignComponent {

  public Editor = ClassicEditor;
  camDescription: any;
  campaignForm!: FormGroup;
  userId!: string;
  imgdata: any;
  minEndDate: Date | null = null;
  readonly minDate = new Date();
  private readonly _currentYear = new Date().getFullYear();
  readonly maxDate = new Date(this._currentYear + 1, 11, 31);

  constructor(private fb: FormBuilder, private campaignService: CampaignService, private router: Router) {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') as any)
    this.userId = userDetails._id;
    this.campaignForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      createdBy: this.userId,
      image: ['', [Validators.required]],
      location: ['', [Validators.required]]
    }, { validators: this.endDateAfterStartDateValidator });
  }

    public onChange({ editor }: ChangeEvent) {
    this.camDescription = editor.getData();
    this.campaignForm.get('description')?.setValue(this.camDescription);
  }

  onStartDateChange(event: MatDatepickerInputEvent<Date>) {
    const startDate = event.value;
    this.minEndDate = startDate;
    this.campaignForm.get('endDate')?.reset();
    this.campaignForm.get('endDate')?.updateValueAndValidity();
  }

  endDateFilter = (d: Date | null): boolean => {
    const startDate = this.campaignForm.get('startDate')?.value;
    if (!d || !startDate) {
      return false;
    }
    return d >= startDate;
  }

  endDateAfterStartDateValidator(group: FormGroup): { [key: string]: any } | null {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;
    return endDate && startDate && endDate <= startDate ? { 'endDateInvalid': true } : null;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imgdata = (reader.result as string);
        this.campaignForm.patchValue({ image: file.name });
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.campaignForm.valid) {
      let formData = this.campaignForm.value;
      formData.image = this.imgdata
      console.log(formData)
      this.campaignService.createCampaign(formData).subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('/campaign/home')
      })
    }
  }
}
