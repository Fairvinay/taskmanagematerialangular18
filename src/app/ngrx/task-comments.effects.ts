import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap, mergeMap } from 'rxjs/operators';
import * as TaskCommentsActions from './task-comments.actions';
import { environment } from '../../environments/environment';
import { Todo } from '../models/todo.model';
import * as TodoActions from './task-comments.actions';
import { TaskService } from '../service/task.service';

@Injectable({
  providedIn: 'root'
})
export class TaskCommentsEffects {
    private readonly apiUrl = `${environment.apiUrl}/tasks`
    constructor(private actions$: Actions,  private taskService: TaskService) {
        console.log(this.actions$);
        if (this.actions$ === undefined) {
            console.log(" actions set to ")
            this.actions$ =  of( TodoActions.loadTodoItems) 
        }
    }
    /*
      loadComments$ = createEffect(() => 
        this.actions$.pipe(
          ofType(TaskCommentsActions.loadComments),
          switchMap(() => 
            this.http.get<string[]>(this.apiUrl).pipe(
              map(comments => TaskCommentsActions.loadCommentsSuccess({ comments })),
              catchError(error => of(TaskCommentsActions.loadCommentsFailure({ error })))
            )
          )
        )
      );
    
      addComment$ = createEffect(() =>
        this.actions$.pipe(
          ofType(TaskCommentsActions.addComment),
          switchMap(({ comment }) =>
            this.http.post(this.apiUrl, { comment }).pipe(
              map(() => TaskCommentsActions.addCommentSuccess({ comment })),
              catchError(error => of(TaskCommentsActions.loadCommentsFailure({ error })))
            )
          )
        )
      );
    
      deleteComment$ = createEffect(() =>
        this.actions$.pipe(
          ofType(TaskCommentsActions.deleteComment),
          switchMap(({ index }) =>
            this.http.delete(`${this.apiUrl}/${index}`).pipe(
              map(() => TaskCommentsActions.deleteCommentSuccess({ index })),
              catchError(error => of(TaskCommentsActions.loadCommentsFailure({ error })))
            )
          )
        )
      );
     */
    loadTodoItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskCommentsActions.loadTodoItems),
            mergeMap(() =>
                this.taskService.getTasks( ).pipe(
                    map(items => TaskCommentsActions.loadTodoItemsSuccess({ items })),
                    catchError(error => of(TaskCommentsActions.loadTodoItemsFailure({ error })))
                )
            )
        )
    );

    addTodoItems$ = createEffect(() => {
        console.log(" add Item effects ....")
        return this.actions$.pipe(
            ofType(TaskCommentsActions.addTodoItem),
            tap(action => console.log('addTodo action received:', action)),
            mergeMap(({ todo }) =>
                this.taskService.createTask( { todo }).pipe(
                    map((items) => TaskCommentsActions.addTodoItemSuccess({ items })),
                    catchError(error => of(TaskCommentsActions.addTodoItemFailure({ error })))
                )
            )
        )
    }
    );

   deleteTodoItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskCommentsActions.deleteTodoItem),
            tap(action => console.log('deleteTodo action received:', action)),
            switchMap(( { todo }) =>
                this.taskService.deleteTask( todo.id).pipe(
                    map(( ) => TaskCommentsActions.deleteTodoItemSuccess(  { index: todo.id.toString() }  )),
                    catchError(error => of(TaskCommentsActions.deleteTodoItemFailure({ error })))
                )
            )
        )
    ); 






}
