import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = `${environment.apiUrl}/tasks`; // Your Spring Boot backend API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get all tasks
  getTasks(): Observable<any> {
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAuthToken()}`);
    return this.http.get<any>(this.apiUrl); // , { headers }
  }

  // Create a new task
  createTask(task: any): Observable<any> {
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAuthToken()}`);
     console.log("task service ....: "+JSON.stringify(task))
    return this.http.post<any>(this.apiUrl, task); // , { headers }
  }

  // Update an existing task
  updateTask(taskId: number, task: any): Observable<any> {
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.put<any>(`${this.apiUrl}/${taskId}`, task); // , { headers }
  }

  // Delete a task
  deleteTask(taskId: number): Observable<any> {
   // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`); //, { headers }
  }
}
