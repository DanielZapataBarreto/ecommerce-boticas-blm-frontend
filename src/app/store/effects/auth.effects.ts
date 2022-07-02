import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { showNotification } from 'src/app/shared/utils/messages.util';
import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action) =>
        this.authService.login(action.credentials).pipe(
          map((loginSuccessResponse) =>
            AuthActions.loginRequestSuccess({ loginSuccessResponse })
          ),
          catchError(({ error }) =>
            of(AuthActions.loginRequestFailure({ error }))
          )
        )
      )
    )
  );

  loginRequestSucess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginRequestSuccess),
        tap(({ loginSuccessResponse }) => {
          this.router.navigateByUrl('/');
          showNotification(
            'success',
            `Logeo exitoso. Bienvenido ${loginSuccessResponse.name}`
          );
        })
      ),
    { dispatch: false }
  );

  loginRequestFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginRequestFailure),
        tap(({ error }) => {
          showNotification('failure', `${error}`);
        })
      ),
    { dispatch: false }
  );
}
