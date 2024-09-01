import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
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
      switchMap((dto) => this.restaurantSrv.getRestaurants(dto.categoryId, dto.searchQuery, dto.page, dto.limit).pipe(
        map((data) => restaurantAction.getRestaurantListSuccess({ result: data })),
        catchError(error => of(restaurantAction.getRestaurantListFailure({ error: error })))
      ))
    )
  );

  _getRestaurantInfo = createEffect(() => this.action$.pipe(
    ofType(restaurantAction.getRestaurantInfo),
    switchMap((dto) => this.restaurantSrv.getRestaurantInfo(dto.res_id).pipe(
      map(data => restaurantAction.getRestaurantInfoSuccess({ info: data })),
      catchError(error => of(restaurantAction.getRestaurantInfoFailure({ error: error }))
      )
    ))
  ));

  _getMenu = createEffect(() => this.action$.pipe(
    ofType(restaurantAction.getMenu),
    switchMap((dto) => this.restaurantSrv.getMenu(dto.id).pipe(
      map(data => restaurantAction.getMenuSuccess({ menu: data })),
      catchError(error => of(restaurantAction.getMenuFailure({ error: error })))
    ))
  ));

  _getFoodDetails = createEffect(() =>
    this.action$.pipe(
      ofType(restaurantAction.getFoodDetails),
      switchMap(dto => this.restaurantSrv.getFoodDetails(dto.id).pipe(
        map(data => restaurantAction.getFoodDetailsSuccess({ foodDetails: data })),
        catchError(error => of(restaurantAction.getFoodDetailsFailure({ error: error })))
      ))
    )
  );
}
