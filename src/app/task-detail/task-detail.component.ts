import { Component } from '@angular/core';
import { Todo } from '../models/todo.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllTodoItems, selectComments, selectTodoById } from '../ngrx/task-comments.selectors';
import { CommonModule, DatePipe, NgClass, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { Observable } from 'rxjs/internal/Observable';
import { updateTodoItem } from '../ngrx/task-comments.actions';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {provideNativeDateAdapter} from '@angular/material/core'

import { MomentDateModule } from '@angular/material-moment-adapter';
/*
*/

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
/*

*/
@Component({
  selector: 'app-task-detail',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,   RouterModule,
    MatButtonModule, MatIconModule,FormsModule,
    MatCheckboxModule,MatDatepickerModule,
    MatInputModule,BreadcrumbComponent,DatePipe, 
    MatListModule,MatFormFieldModule, NgFor,NgClass,
    BreadcrumbComponent],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  todoId: string | null = null;
   
  todo$: Observable<Todo | undefined>;
  todo: Todo | undefined;
  isEditMode: boolean = false;
  dtp: DatePipe = new DatePipe('en');

  constructor(
    private route: ActivatedRoute,
    private store: Store, private router : Router
  ) {
    const todoId = Number(this.route.snapshot.paramMap.get('id'));
    this.todo$ = this.store.select(selectTodoById(todoId));
    this.todo$.subscribe(todo => this.todo = todo);  // Store the todo item for editing
  }
  onEdit(): void {
    this.isEditMode = true;  // Enable edit mode
  }
  onSave(): void {
    if (this.todo) {
      // Dispatch an action to save the updated todo (updateTodo action should be defined in your store)
      this.store.dispatch(updateTodoItem({ todo: this.todo }));
    }
    this.isEditMode = false;  // Disable edit mode after saving
  }

  ngOnInit(): void {
    this.todoId = this.route.snapshot.paramMap.get('id');

    console.log("  this.todoId "+ this.todoId)
    // Select all Todo items and find the one with the matching id

    this.store.select(selectComments).subscribe(todos => {
      if (this.todoId) {
        this.todo = todos.find(todo => todo.id.toString() === this.todoId);
        //moment('13/02/2000', 'DD/MM/YYYY').format('YYYY-MM-DD');
        
        // just change the date 
        console.log(" todo "+JSON.stringify(this.todo))
        //this.todo?.dueDate.setDate(Date.now() +1);
        let l = this.dtp.transform(this.todo?.dueDate, 'yyyy-MM-dd','en')
        let std =l !=undefined ? new Date (l): new Date("2023-11-11");
        console.log(" std "+JSON.stringify(std))
        if(this.todo) {
          this.todo.dueDate.setDate(std.getDate()+1)
        }
       
        console.log(" todo datea "+this.todo?.dueDate)
      } 
    });

  }

  goBack(): void {
    //window.history.back(); // Navigate back to the Todo list
     this.router.navigate(['app'])
  }
}
