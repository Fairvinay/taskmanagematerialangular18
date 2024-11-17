import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState  } from './task-comments.reducer';
import { Todo } from '../models/todo.model';

export const selectTaskCommentsState = createFeatureSelector<TaskState>('taskComments');
export const selectComments2 = createFeatureSelector<any[]>('taskComments');
export const selectComments = createSelector(
  selectTaskCommentsState,
  (state: TaskState) => state.todo
);
export const selectAllComments = createSelector(
    selectComments2,
    (state) => state // Simple selector for all comments (tasks)
  );

  // Selector to get the Todo items
export const selectTodoItems = createFeatureSelector<TaskState>('todoItems');
const t :Todo[] =  [

  Object.assign({}, { id: 1,task: "Buy groceries", title: "Buy groceries", description: "Milk, eggs, bread", dueDate: new Date("2024-11-15"), completed: false }),
  Object.assign({}, { id: 2, task:"Finish project", title: "Finish project", description: "Complete TypeScript module", dueDate: new Date("2024-11-16"), completed: false }),
  Object.assign({}, { id: 3,task: "Clean the house",  title: "Clean the house", description: "Living room and kitchen", dueDate: new Date("2024-11-18"), completed: false })

]; 
export const selectAllTodoItems = createSelector(
  selectTodoItems,
  (state: TaskState ) => state.todo// Select all Todo items
);
// Selector to get a todo by id
 export const selectTodoById = (id: number) => createSelector(
  selectTaskCommentsState,
    
    (state: TaskState) => state.todo.find((todo: Todo) => todo.id === id)
  ); 