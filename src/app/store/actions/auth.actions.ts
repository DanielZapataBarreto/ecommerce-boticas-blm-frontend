import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ credentials: User }>()
);
export const loginRequestSuccess = createAction(
  '[Auth] Login Request Success',
  props<{ loginSuccessResponse: User }>()
);
export const loginRequestFailure = createAction(
  '[Auth] Login Request Failure',
  props<{ error: string }>()
);

export const autoLoginRequest = createAction(
  '[Auth] Autologin Request',
  props<{ id: string }>()
);
export const autoLoginRequestSuccess = createAction(
  '[Auth] Autologin Request Success',
  props<{ user: User }>()
);
export const autoLoginRequestFailure = createAction(
  '[Auth] Autologin Request Failure',
  props<{ error: string }>()
);
