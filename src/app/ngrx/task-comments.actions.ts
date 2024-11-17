import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo.model';
 

// Action for loading Todo items
export const loadTodoItems = createAction('[Todo] Load Todo Items');
export const loadTodoItemsSuccess = createAction(
    '[Task Comments] Load Items Success',
    props<{ items: Todo[] }>()
  );
export const loadTodoItemsFailure = createAction(
    '[Task Comments] Load Items Failure',
    props<{ error: any }>()
  );
// Action for adding a new Todo item
export const addTodoItem = createAction(
  '[Todo] Add Todo Item',
  props<{ todo: Todo }>()
);
export const addTodoItemSuccess = createAction(
    '[Task Comments] Add Item Success',
    props<{ items: any }>()
  );
  export const addTodoItemFailure = createAction(
    '[Task Comments] Add Items Failure',
    props<{ error: any }>()
  );
// Action for deleting a Todo item by index
export const updateTodoItem = createAction(
    '[Todo] Udpate Todo Item',
    props<{ todo: Todo }>()
  );

// Action for deleting a Todo item by index
export const deleteTodoItem = createAction(
  '[Todo] Delete Todo Item',
  props<{todo: Todo }>()
);
export const deleteTodoItemSuccess = createAction(
    '[Task Comments] Delete Item Success',
    props<{ index: string }>()
  );
  export const deleteTodoItemFailure = createAction(
    '[Task Comments] Load Items Failure',
    props<{ error: any }>()
  );

export const loadComments = createAction('[Task Comments] Load Comments');
export const loadCommentsSuccess = createAction(
  '[Task Comments] Load Comments Success',
  props<{ comments: string[] }>()
);
export const loadCommentsFailure = createAction(
  '[Task Comments] Load Comments Failure',
  props<{ error: any }>()
);

export const addComment = createAction(
  '[Task Comments] Add Comment',
  props<{ comment: string }>()
);

export const addCommentSuccess = createAction(
  '[Task Comments] Add Comment Success',
  props<{ comment: string }>()
);

export const deleteComment = createAction(
  '[Task Comments] Delete Comment',
  props<{ index: number }>()
);

export const deleteCommentSuccess = createAction(
  '[Task Comments] Delete Comment Success',
  props<{ index: number }>()
);
