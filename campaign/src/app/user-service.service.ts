import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SnackbarService } from './snackbar-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private snackBar: SnackbarService) { }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  loginUser(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }
}
