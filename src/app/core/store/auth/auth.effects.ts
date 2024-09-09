import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import * as authActions from './auth.actions';
@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authSrv: AuthService,
  ) { }

  _loginRequest = createEffect(() =>
    this.action$.pipe(
      ofType(authActions.loginRequest),
      exhaustMap((action) =>
        this.authSrv.doLogin(action.accCred)
          .pipe(
            map((token) => authActions.loginSuccess({ token })),
            catchError((error) => {
              alert(
                'Login failure! '
              );
              return of(authActions.loginFailure({ error }));
            })
          )
      )
    )
  );

  _loginSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(authActions.loginSuccess),
        tap((token) => {
          this.authSrv.setToken(token.token);
          this.authSrv.changeLoginStatus(true);
          alert(
            'Login Successful! ' +
            'Welcome, '
          );
        })
      ),
    { dispatch: false }
  );
}
