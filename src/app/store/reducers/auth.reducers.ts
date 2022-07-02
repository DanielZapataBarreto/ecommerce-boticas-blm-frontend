import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import {
  loginRequest,
  loginRequestFailure,
  loginRequestSuccess,
} from '../actions/auth.actions';

export interface State {
  user: User;
  isLogging: boolean;
  loginError?: string;
}

export const initialState: State = {
  user: null!,
  isLogging: false,
};

const _authReducer = createReducer(
  initialState,
  on(loginRequest, (state) => {
    return {
      ...state,
      isLogging: true,
    };
  }),
  on(loginRequestSuccess, (state, { loginSuccessResponse }) => {
    return {
      ...state,
      user: loginSuccessResponse,
      isLogging: false,
    };
  }),
  on(loginRequestFailure, (state, { error }) => {
    return {
      ...state,
      loginError: error,
      user: null!,
      isLogging: false,
    };
  })
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}

export const selectAuthState = createFeatureSelector<State>('auth');
export const selectUserFromAuthState = createSelector(
  selectAuthState,
  (state) => state.user
);
export const selectIsLoggingFromAuthState = createSelector(
  selectAuthState,
  (state) => state.isLogging
);
