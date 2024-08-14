import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SnackbarService } from '../snackbar-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserCampaignService {

  private baseUrl = 'http://localhost:3000/api/userCampaign';

  constructor(private http: HttpClient, private snackBar: SnackbarService) { }

  registerToCampaign(userId: string, campaignId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { userId, campaignId }).pipe(catchError(error => {
      this.snackBar.snackbarDisplay(error.error.message)
      console.log(error)
      return throwError(() => new Error('Error registerToCampaign'));
    }));
  }

  getUserCampaigns(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getCampaignsOfUser/${userId}`).pipe(catchError(error => {
      this.snackBar.snackbarDisplay(error.error.message)
      return throwError(() => new Error('Error getUserCampaigns'));
    }));
  }

  getCampaignUsers(campaignId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getUsersOfCampaign/${campaignId}`).pipe(catchError(error => {
      this.snackBar.snackbarDisplay(error.error.message)
      return throwError(() => new Error('Error getCampaignUsers'));
    }));
  }

  donate(userId: string, campaignId: string, donationAmount: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/donate`, { userId, campaignId, donationAmount }).pipe(catchError(error => {
      this.snackBar.snackbarDisplay(error.error.message)
      return throwError(() => new Error('Error donate'));
    }));
  }

  getTotalDonation(): Observable<any> {
    return this.http.get(`${this.baseUrl}/totalDonations`).pipe(catchError(error => {
      // this.snackBar.snackbarDisplay(error.error.message)
      return throwError(() => new Error('Error getTotalDonation'));
    }));
  }

  getUserDonation(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/userDonations/${userId}`).pipe(catchError(error => {
      // this.snackBar.snackbarDisplay(error.error.message)
      return throwError(() => new Error('Error getUserDonation'));
    }));
  }
}
