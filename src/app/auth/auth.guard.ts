import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router , private authService : AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      console.log("In Auth gaurd for "+route.url)
      let u = localStorage.getItem('currentUser');
      let tk = localStorage.getItem('token') 
      if( u || tk ){
          console.log("user there allow ")
      }
      let isAuthenticated = this.authService.isAuthenticated(); // Simulate an unauthenticated user for now
      let token = this.authService.getAuthToken_1();
      if (  token == ""){
         token = localStorage.getItem("token") !=null ? localStorage.getItem("token") : ""

      }
      if (isAuthenticated && token !="" ) {
        // If the user is authenticated, allow access
        
        return true;
      } else {
        // Otherwise, redirect to the login page
        this.router.navigate(['/login']);
        return false;
      }

    


  }
  
}
