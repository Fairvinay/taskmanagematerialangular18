import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

export const routes: Routes = [{ path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent }, 
    { path: 'logout', component: LoginComponent }, 
    { path: 'app', component: AppComponent ,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: TaskListComponent ,canActivate: [AuthGuard]},
          
            { path: 'tasks', component: TaskListComponent ,canActivate: [AuthGuard]},
            { path: 'todo/:id', component: TaskDetailComponent , canActivate: [AuthGuard]},
            
          ],


    },  // Define the /login route
     // Define the /login route
     
   ];


