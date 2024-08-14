import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SnackbarService } from '../snackbar-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient, private snackBar: SnackbarService) { }

  getAllUsers(): Observable<any> {
    const url = `${this.baseUrl}/getAll`;
    return this.http.get<any>(url).pipe(catchError(error => {
      this.snackBar.snackbarDisplay(error.error.message)
      return throwError(() => new Error('Error getAllUsers'));
    }));
  }

  getUserById(id: any): Observable<any> {
    const url = `${this.baseUrl}/get/${id}`;
    return this.http.get<any>(url).pipe(catchError(error => {
      this.snackBar.snackbarDisplay(error.error.message)
      return throwError(() => new Error('Error getUserById'));
    }));
  }

  getUsersByRole(id: any): Observable<any> {
    const url = `${this.baseUrl}/getByRole/${id}`;
    return this.http.get<any>(url).pipe(catchError(error => {
      this.snackBar.snackbarDisplay(error.error.message)
      return throwError(() => new Error('Error getUsersByRole'));
    }));
  }

  updateUser(id: any, request: any): Observable<any> {
    const url = `${this.baseUrl}/update/${id}`;
    return this.http.put<any>(url, request).pipe(catchError(error => {
      this.snackBar.snackbarDisplay(error.error.message)
      return throwError(() => new Error('Error updateUser'));
    }));
  }

  deleteUser(id: any): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete<any>(url).pipe(catchError(error => {
      this.snackBar.snackbarDisplay(error.error.message)
      return throwError(() => new Error('Error deleteUser'));
    }));
  }

}
