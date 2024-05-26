import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { ProfileService } from "../../services/profile.service";
import * as profileAction from './profile.actions';
@Injectable()
export class ProfileEffects {
  constructor(
    private action$: Actions,
    private profileSrv: ProfileService
  ) { }

  _getProfileRequest = createEffect(() =>
    this.action$.pipe(
      ofType(profileAction.GET_PROFILE),
      exhaustMap(() => {
        return this.profileSrv.getProfile()
          .pipe(
            map((profile) => profileAction.getProfileSuccess({ profile: profile })),
            catchError(error => of(profileAction.getProfileFailure({ error: error })))
          );
      })
    )
  );
}
