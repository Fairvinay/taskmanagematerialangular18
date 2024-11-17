import { createReducer, on } from '@ngrx/store';
import * as TaskCommentsActions from './task-comments.actions';
import { Todo } from '../models/todo.model';
import { loadTodoItems, addTodoItem, deleteTodoItem, updateTodoItem, loadTodoItemsSuccess, loadTodoItemsFailure, addTodoItemSuccess, addTodoItemFailure } from './task-comments.actions';

/*export interface State {
  comments: string[];
}*/
export interface TaskState {
  todo: Todo[],
  loading: boolean,
  error: null
}
const t :Todo[] =  [

  Object.assign({}, { id: 1,task: "Buy groceries", title: "Buy groceries", description: "Milk, eggs, bread", dueDate: new Date("2024-11-15"), completed: false }),
  Object.assign({}, { id: 2, task:"Finish project", title: "Finish project", description: "Complete TypeScript module", dueDate: new Date("2024-11-16"), completed: false }),
  Object.assign({}, { id: 3,task: "Clean the house",  title: "Clean the house", description: "Living room and kitchen", dueDate: new Date("2024-11-15"), completed: false })

]; 
export const initialState: TaskState = {
  todo: t,
  loading: false,
  error: null
}


/*export const initialState: State = {
  comments: [],
};*/

export const taskCommentsReducer = createReducer(
       initialState,
  on(loadTodoItems, (state) =>  ({
    ...state,
    loading: true,
    error: null // reset any previous errors
  })), // Placeholder for loading Todo items
   on(loadTodoItemsSuccess, (state, { items }) => ({
    ...state,
    loading: false,
    items
  })),
  on(loadTodoItemsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(addTodoItem, (state, { todo }) => ({
    ...state,
    todo: [...state.todo, todo],  // Add the new Todo to the array
  })), // Add a new Todo item
  // Handle the new todo item being added
  // this bellow causing extra empty entry after 
  // addTodoItem in List comppnent and dispatch 
  //canno solve it
 /* on( addTodoItemSuccess, (state, { items }) => ({
    ...state,
    todo: [...state.todo, items] // Add the new todo item to the array
  })),
  on( addTodoItemFailure, (state, { error }) => ({
    ...state,
    error
  })),
  */

  on(deleteTodoItem, (state, { todo }) => ({
    ...state,
    todo: state.todo.filter(item => item.id !== todo.id),  // Remove deleted item from the state
  })), // Delete Todo by id state.todo.filter(todoO => todoO.id !== todo.id))
   // Handling the updateTodoItem action
  on( updateTodoItem, (state, { todo }) => ({
       ...state,
       todos: state.todo.map(t => 
    t.id === todo.id ? { ...t, title: todo.title} : t
  ),
})),
 
);
/* on(TaskCommentsActions.loadCommentsSuccess, (state, { comments }) => ({
    ...state,
    comments,
  })),
  on(TaskCommentsActions.addCommentSuccess, (state, { comment }) => ({
    ...state,
    comments: [...state.comments, comment],
  })),
  on(TaskCommentsActions.deleteCommentSuccess, (state, { index }) => ({
    ...state,
    comments: state.comments.filter((_, i) => i !== index),
  })) */