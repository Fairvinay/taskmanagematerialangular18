import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { login } from '../ngrx/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule , MatCardModule , MatButtonModule ,MatInputModule ,

    MatFormFieldModule ,MatIconModule 
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  welcomeMessage: string = '';
  isLoggedIn: boolean = false;

  constructor(private fb: FormBuilder,private router: Router,  private authService : AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    
  }

  // Handle form submission
 async onLogin():Promise<void>  {
    console.log("login called ....")
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      // Simulate login process (in a real app, you would call an API here)
      console.log("validation ....")
      if (( username === 'admin'||  username === 'user') 
        && (password === 'password' || password === 'adminpassword' ) )  {

      try { 
          (await this.authService.login(username, password))
         .subscribe((response: { token: string; }) => {
         localStorage.setItem('token', response.token);
         this.router.navigate(['/app']);         
         }, 
      
       (error: any) => {
         // Handle login failure (e.g., show an error message)
        // console.error('Login failed', error);
         this.welcomeMessage = 'Invalid credentials, please try again.';
       }
         );/*then( (logresp:any) => { 
          console.log("logresp ...." )
         let token =  logresp .then((r: any) => r ); 
         if ( token ) { 
        this.isLoggedIn = true;
        console.log("valid ....")
        this.welcomeMessage = `Welcome, ${username}!`;  // Show welcome message
        this.router.navigate(['/app']);
         } else {
          this.welcomeMessage = 'Invalid credentials, please try again.';
         }
         }); */
        } 
        catch(errr){
           console.log("Backend is closed .... run in standalone ")
           this.router.navigate(['/app']);
        }
      } else {
        this.welcomeMessage = 'Invalid credentials, please try again.';
        this.isLoggedIn = false;
      }
    }
  }
}
