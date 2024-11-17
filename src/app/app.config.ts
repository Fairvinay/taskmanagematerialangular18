import { ApplicationConfig,  importProvidersFrom,  provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';
 

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BasicInterceptor } from './basic.interceptor';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { taskCommentsReducer } from './ngrx/task-comments.reducer';
import { TaskCommentsEffects } from './ngrx/task-comments.effects';
import { authReducer } from './ngrx/auth/auth.reducer';

 
const forFeat =  EffectsModule.forFeature([TaskCommentsEffects]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
  
    provideStore({ taskComments: taskCommentsReducer ,auth: authReducer }),
    provideAnimationsAsync(),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: BasicInterceptor,
        multi: true
    },   provideRouter(routes, withDebugTracing()),
        provideHttpClient(withInterceptorsFromDi()),
    provideEffects([TaskCommentsEffects]) , // Register the TodoEffects]
    importProvidersFrom(
      StoreModule.forRoot({ auth: authReducer }, {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        }}) , // Register the auth reducer
        StoreModule.forFeature('auth', authReducer),
      StoreModule.forRoot({ taskComments: taskCommentsReducer }, {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        }})
     // 
      /* ,
      }*/
     ) 
    // Register Effects at the root level
  ]
   
};
/*
   provideEffects( [TaskCommentsEffects] ) , // Register the TodoEffects]
    importProvidersFrom(
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      EffectsModule.forFeature(TaskCommentsEffects) , 
    
     ), 

 // Register Effects globally
    
{
  providers: [
    provideHttpClient(
      withInterceptors([ basicJwtInterceptorInterceptor])
      )
  ]
}

{
    provide: HTTP_INTERCEPTORS,
    useClass: basicJwtInterceptorInterceptor,
    multi: true
  }
*/