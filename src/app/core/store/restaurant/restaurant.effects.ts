import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { RestaurantService } from "../../services/restaurant.service";
import * as restaurantAction from './restaurant.actions';

@Injectable()
export class RestaurantEffects {
  constructor(
    private action$: Actions,
    private restaurantSrv: RestaurantService
  ) { }

  _getRestaurantList = createEffect(() =>
    this.action$.pipe(
      ofType(restaurantAction.getRestaurantList),
      exhaustMap(() => this.restaurantSrv.getRestaurants().pipe(
        map((resList) => restaurantAction.getRestaurantListSuccess({ restaurantList: resList })),
        catchError(error => of(restaurantAction.getRestaurantListFailure({ error: error })))
      ))
    )
  );

  _getRestaurantInfo = createEffect(() =>
    this.action$.pipe(
      ofType(restaurantAction.getRestaurantInfo),
      exhaustMap((dto) => this.restaurantSrv.getRestaurantInfo(dto.res_id).pipe(
        map(data => restaurantAction.getRestaurantInfoSuccess({ info: data })),
        catchError(error => of(restaurantAction.getRestaurantInfoFailure({ error: error }))
        )
      ))
    )
  );
}
