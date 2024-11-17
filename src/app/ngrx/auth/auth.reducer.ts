// auth.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';

// Define the shape of the auth state
export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;  
}

// Initial state of the authentication feature
export const initialState: AuthState = {
  token: localStorage.getItem('token') || null,  // If there's a token in localStorage, use it
  isAuthenticated: localStorage.getItem('token') ? true : false, // If there's a token, user is authenticated
};

// Define the reducer function
export const authReducer = createReducer(
  initialState,
  
  // When login action is dispatched, store the token and set authenticated to true
  on(login, (state, { token }) => ({
    ...state,
    token,
    isAuthenticated: true,
  })),

  // When logout action is dispatched, remove the token and set authenticated to false
  on(logout, (state) => ({
    ...state,
    token: null,
    isAuthenticated: false,
  }))
);
