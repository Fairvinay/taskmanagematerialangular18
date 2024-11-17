import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { taskCommentsReducer } from './task-comments.reducer';
import { TaskCommentsEffects } from './task-comments.effects';
import { TaskCommentComponent } from '../task-comment/task-comment.component';

@NgModule({
  declarations: [TaskCommentComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('taskComments', taskCommentsReducer),
    EffectsModule.forRoot([TaskCommentsEffects]),
  ],
  exports: [TaskCommentComponent],
})
export class TaskCommentsModule {}
