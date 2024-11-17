import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { login, logout } from '../ngrx/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/tasks`; // Your Spring Boot backend API URL
  private authRegisterUrl = `${environment.authUrl}/register`
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  
  constructor(private http: HttpClient, private router: Router , private store: Store) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Method to log in user and store JWT token
  async login(username: string, password: string): Promise<Observable<any>> {  //
     let name = username;
     let email = environment.defaultEmail ;
     let roles = environment.defaultRole;
      let tok =  {   };
    return   this.http.post<{ token: string }>(this.authRegisterUrl, 
      { 'name' : username , 'password': password,'roles': roles, 'email' : email })
      .pipe(
        catchError((error) => {
          console.error('Login failed', error);
         return Promise.resolve(of("/app"))
            //throw error;  // You can handle the error accordingly
        })
      );
      
     //  return tk;
    /*return this.http
      .post<any>(`${this.apiUrl}/tasks`, { username, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('currentUser', JSON.stringify(response)); // Save JWT token
          this.currentUserSubject.next(response);
        })
      );*/
  }

   // Method to log out user and remove JWT token
   logout() {
    localStorage.removeItem('currentUser'); 
    localStorage.removeItem('token');
    this.store.dispatch(logout());
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
// Get JWT token from localStorage
getAuthToken_1(): string | null {
  const currentUser = this.currentUserSubject.value;
  return currentUser ? currentUser.token : '';
}

// Method to check if the user is authenticated
isAuthenticated(): boolean {
  console.log("auth service isAuthenticated ")
  return !!this.currentUserSubject.value;
}
  getAuthToken() {

    return '392492384'
  }
}
