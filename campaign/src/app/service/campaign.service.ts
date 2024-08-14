import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SnackbarService } from '../snackbar-service.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private baseUrl = 'http://localhost:3000/api/campaign';

  constructor(private http: HttpClient, private snackBar: SnackbarService) { }

  createCampaign(request: any): Observable<any> {
    const url = `${this.baseUrl}/create`;
    return this.http.post<any>(url, request).pipe(catchError(error => {
      this.snackBar.snackbarDisplay(error.error.message)
      return throwError(() => new Error('Error createCampaign'));
    }));
  }

  getAllCampaigns(): Observable<any> {
    const url = `${this.baseUrl}/getAll`;
    return this.http.get<any>(url).pipe(catchError(error => {
      this.snackBar.snackbarDisplay(error.error.message)
      return throwError(() => new Error('Error getAllCampaigns'));
    }));
  }

  getValidCampaigns(): Observable<any> {
    const url = `${this.baseUrl}/get-valid-events`;
    return this.http.get<any>(url).pipe(catchError(error => {
      // this.snackBar.snackbarDisplay(error.error.message)
      return throwError(() => new Error('Error getValidCampaigns'));
    }));
  }

  getCampaignById(id: any): Observable<any> {
    const url = `${this.baseUrl}/get/${id}`;
    return this.http.get<any>(url).pipe(catchError(error => {
      console.log(error)
      this.snackBar.snackbarDisplay(error.error.message)
      return throwError(() => new Error('Error getCampaignById'));
    }));
  }

  deleteCampaign(id: any): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete<any>(url).pipe(catchError(error => {
      this.snackBar.snackbarDisplay(error.error.message)
      return throwError(() => new Error('Error deleteCampaign'));
    }));
  }

  updateCampaign(id: any, request: any): Observable<any> {
    const url = `${this.baseUrl}/update/${id}`;
    return this.http.put<any>(url, request).pipe(catchError(error => {
      this.snackBar.snackbarDisplay(error.error.message)
      return throwError(() => new Error('Error updateCampaign'));
    }));
  }


}
