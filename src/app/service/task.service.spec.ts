import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../auth/auth.service';
import { of } from 'rxjs';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['getAuthToken_1']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TaskService,
        { provide: AuthService, useValue: spy }
      ]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    // Mock the AuthService.getToken method to return a test JWT token
    authServiceSpy.getAuthToken_1.and.returnValue('mock-jwt-token');
     

  });

  afterEach(() => {
    httpMock.verify(); // Ensure no requests are pending after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tasks from the backend', () => {
    const mockTasks = [
      { id: 1, name: 'Task 1', description: 'First task' },
      { id: 2, name: 'Task 2', description: 'Second task' }
    ];

    // Call the service method
    service.getTasks().subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });

    // Simulate the HTTP request and provide mock data
    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should create a new task', () => {
    const newTask = { name: 'New Task', description: 'Description of new task' };
    const createdTask = { id: 3, name: 'New Task', description: 'Description of new task' };

    // Call the service method
    service.createTask(newTask).subscribe((task) => {
      expect(task).toEqual(createdTask);
    });

    // Simulate the HTTP request and provide mock data
    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(createdTask);
  });

  it('should update an existing task', () => {
    const taskId = 1;
    const updatedTask = { name: 'Updated Task', description: 'Updated description' };

    // Call the service method
    service.updateTask(taskId, updatedTask).subscribe((task) => {
      expect(task).toEqual(updatedTask);
    });

    // Simulate the HTTP request and provide mock data
    const req = httpMock.expectOne(`/api/tasks/${taskId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTask);
    req.flush(updatedTask);
  });

  it('should delete a task', () => {
    const taskId = 1;

    // Call the service method
    service.deleteTask(taskId).subscribe((response) => {
      expect(response).toEqual({ success: true });
    });

    // Simulate the HTTP request and provide mock data
    const req = httpMock.expectOne(`/api/tasks/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });
});
