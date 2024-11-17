import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { loadComments, addComment, deleteComment, addTodoItem, deleteTodoItem, loadTodoItems, updateTodoItem } from '../ngrx/task-comments.actions';
import { selectAllTodoItems, selectComments, selectTodoById } from '../ngrx/task-comments.selectors';
import { CommonModule, NgClass, NgFor } from '@angular/common';

import {oneDayInMilliseconds, randomDesc, randomTitle } from '../utils/Generator';
 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Todo } from '../models/todo.model';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../service/task.service';
import { TruncItPipe } from './trunc-it.pipe';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

export interface TodoItem { 
  id:number;
  task:string;
  title:string;
  description:string;
  dueDate:Date;
  completed:boolean
}
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,RouterModule,  MatButtonModule, MatIconModule,FormsModule,
    MatCheckboxModule,
    MatInputModule,BreadcrumbComponent,
    MatListModule,MatFormFieldModule, NgFor,NgClass,
    TruncItPipe
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  
})
export class TaskListComponent {
  tasks$: Observable<any[]>;
  todos$: Observable<Todo[]>;
  selectedTodo$: Observable<Todo | undefined>;
  newTask : string =''
  @Input() todoList:TodoItem [] =[];   
  hoveredTodo: Todo  |undefined; // To track which todo is hovered over
  title: any;
  errorMessage: string | undefined;
  newTodo: any;
  doUpdate: boolean = false;
  constructor(private store: Store , private taskService: TaskService, private router: Router) {
    this.store.dispatch(loadTodoItems());
    this.tasks$ = this.store.select(selectComments); // Select tasks from the store selectComments
    this.todos$ = this.store.select(selectComments); // Select all Todo items from the store 
    // selectAllTodoItems will not work as the provideStore is configured with taskComments
   this.selectedTodo$ = this.store.pipe(select( selectTodoById(1)));
   this.store.pipe(select( selectTodoById(1))).subscribe( t => this.hoveredTodo = t );
  }
   
  ngOnInit(): void {
     this.store.dispatch(loadComments()); // Dispatch action to load tasks
     this.tasks$ = this.store.select(selectComments); // Select tasks from the store
     this.todos$ = this.store.select(selectComments); 
   // Dispatch action to load Todo items (if needed)
     //this.loadTodos();
  }
   // Edit move to task details 
   onEdit(todoId: number): void {
    // Navigate to the details page of the selected todo item
    this.router.navigate(['app/todo', todoId]);
  }

   // Edit task details 

    // Load all todos from the backend
    loadTodos() {
      this.taskService.getTasks().subscribe(
        (data) => {
          this.todoList = data;
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Failed to load todos';
          console.error(error);
        }
      );
    }

   // Add a new todo
   addTodo() {
    if (!this.newTodo.title) {
      alert('Title is required!');
      return;
    }
   
  }  
  toggleCompletedNew(todoNew :Todo) :void {
    //console.log("i "+index)
    //this.selectedTodo$ = this.store.pipe(select( selectTodoById(1)));
    this.store.dispatch(updateTodoItem({ todo: todoNew }));
   //  this.todos$ [index].completed = !this.todoList[index].completed
    
 } 
 /* readonly partiallyComplete = computed(() => {
  const task = this.task();
  if (!task.subtasks) {
    return false;
  }
  return task.subtasks.some(t => t.completed) && !task.subtasks.every(t => t.completed);
});*/

  addTodoItem(): void {
    console.log(" add Item ....")
    if(this.newTask.trim() !== ''){
      console.log(" add Item ....valid ")
    const newTodo: Todo = {
      id: Math.round(Math.random( ) *100), // Generate a unique id
      task: this.newTask.trim(),
      title: this.newTask.trim(),
      description: this.newTask.trim(),
      dueDate: new Date() , // Use current date for due date
      completed: false
    };  
   

    this.store.dispatch(addTodoItem({ todo: newTodo })); // Dispatch the action to add a new Todo
    this.newTask = "";
    this.hoveredTodo =  newTodo;
    //this.store.dispatch(loadTodoItems()); 
    // this.todos$ = this.store.select(selectComments);
    }  
  }
  
  deleteTodoItem(id: string): void {
    this.selectedTodo$ = this.store.pipe(select( selectTodoById(parseInt(id))));
    // Convert observable to promise and get the object
    let todo :Todo = { id: 0,  task:'' , title: '', description: '', dueDate: new Date('2024-01-02') ,completed:false };
    (async function getUser(  selectedTodo:Observable<Todo | undefined> , storeIn) {
      todo = await lastValueFrom(selectedTodo).then(t =>   t !=undefined ? t :  new Todo( 0, '', '', new Date()  ));
      console.log('todo from promise:', todo);
       storeIn.dispatch(deleteTodoItem({ todo   }  )); // Dispatch the action to delete a Todo by id
    })(this.selectedTodo$, this.store);
    this.selectedTodo$.forEach( todo => { 
      console.log("Found the Item ... ")
      if ( todo !=undefined)
       { this.store.dispatch(deleteTodoItem({todo })); } 
    })
    
  }

  viewTodoDetail(id: string): void {
    // Navigate to Todo detail (e.g., using router.navigate)
    console.log('Navigating to todo detail with ID:', id);
  }
  addTask(): void {
    this.store.dispatch(addComment({ comment: 'New Task' })); // Dispatch action to add a new task
  }

  deleteTask(index: number): void {
    this.store.dispatch(deleteComment({ index })); // Dispatch action to delete a task
  }

  viewTask(id: string): void {
    // Navigate to task detail page
    console.log('Navigating to task with ID:', id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(" onChanges ... .")
    if (changes['todoList']) {
      // Capture the previous and current value of 'username'
      const currentValue = changes['todoList'].currentValue;
      const previousValue = changes['todoList'].previousValue;

      console.log('Previous username:', previousValue);
      console.log('Current username:', currentValue);
      if(previousValue !=currentValue ){
      // Update the previousUsername property to display it in the template
      this.doUpdate = true; }
    }
  }
  

  brushTask():void  {
    if(this.newTask.trim() !== ''){
      const newTodoItem : TodoItem = {
        id: Math.random( )*50,
        task: this.newTask,
        title:this.newTask,
        description: this.newTask,
        completed: false,
        dueDate: new Date(Date.now() + oneDayInMilliseconds)
      }
      // this.todoList.push(newTodoItem)
       console.log(this.todoList)
       this.newTask=""
       this.taskService.createTask(newTodoItem).subscribe(
        (todo) => {
          this.todoList.push(todo); // Add the new todo to the list
          console.log("create task to server .....")
          this.newTodo = { id: 0, title: '', description: '', dueDate: '', completed: false }; // Reset the newTodo
        },
        (error) => {
          this.errorMessage = 'Failed to add todo';
          console.log("create task error at server ....."+JSON.stringify(error))
          console.error(error);
        }
      );
    }  
    
  }
  toggleCompleted(index:number ) :void {
     console.log("i "+index)
      this.todoList[index].completed = !this.todoList[index].completed

  } 
  updateTodo(todo: Todo) {
    //taskId: number, task: any
    //let tId  = this.todoList.filter(item => item.id === todo.id)
    console.log("Update called .....")
    let oldTodo   =  this.todoList.find((t) => t.id === todo.id);
    
    if( oldTodo?.description.trim() != todo.title.trim()  ){ 
    this.taskService.updateTask(todo.id, todo).subscribe(
      (updatedTodo) => {
        const index = this.todoList.findIndex((t) => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todoList[index] = updatedTodo; // Update the todo in the list
        }
      },
      (error) => {
        this.errorMessage = 'Failed to update todo';
        console.error(error);
      }
    ); 
    }
    else { 
      console.log("Update called .....no change ")
    }
  }



  deleteBrushTask(id:number){
      this.todoList = this.todoList.filter(item => item.id !== id )
      console.log(this.todoList)
      this.taskService.deleteTask(id).subscribe(
        () => {
          this.todoList = this.todoList.filter((todo) => todo.id !== id); // Remove the deleted todo from the list
          console.log("delete task to server .....")
        },
        (error) => {
          this.errorMessage = 'Failed to delete todo';
          console.log("delete task error .......")
          console.error(error);
        }
      );
   


  }
 

} 

 
 
