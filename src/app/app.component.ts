import { NgClass, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { RouterModule, RouterOutlet } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
 
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
 
import { taskCommentsReducer } from './ngrx/task-comments.reducer';
import { TaskCommentsEffects } from './ngrx/task-comments.effects';
import * as TodoActions from './ngrx/task-comments.actions';

import {oneDayInMilliseconds, randomDesc, randomTitle } from './utils/Generator';

import { Store } from '@ngrx/store';
import { selectAllTodoItems, selectComments } from './ngrx/task-comments.selectors';


import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { TaskService } from './service/task.service';
import { TaskListComponent } from './task-list/task-list.component';

export interface TodoItem { 
  id:number;
  task:string;
  title:string;
  description:string;
  dueDate:Date;
  completed:boolean
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, BreadcrumbComponent,   
    // Feature Effects Module (for feature-specific side effects)
    TaskListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [Store, TaskService] 
})
export class AppComponent {
  private store = inject(Store);  // Use inject for dependency injection in a standalone component
  //documents$ = this.store.select(selectAllTodoItems);
  constructor() {
    // Dynamically configure the store and effects using injector
    StoreModule.forFeature('taskComments', taskCommentsReducer);
    EffectsModule.forFeature([TaskCommentsEffects]);

    //this.store.dispatch(TodoActions.loadTodoItems());
  }

}
