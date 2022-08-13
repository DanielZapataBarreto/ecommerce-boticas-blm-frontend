import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import {
  autoLoginRequest,
  autoLoginRequestFailure,
  autoLoginRequestSuccess,
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
  }),
  on(autoLoginRequest, (state) => {
    return {
      ...state,
      isLogging: true,
    };
  }),
  on(autoLoginRequestSuccess, (state, { user }) => {
    return {
      ...state,
      user,
      isLogging: false,
    };
  }),
  on(autoLoginRequestFailure, (state, { error }) => {
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
export const selectUserIdFromAuthState = createSelector(
  selectAuthState,
  (state) => state.user._id
);
export const selectUserAddressFromAuthState = createSelector(
  selectAuthState,
  (state) => state.user.address
);
