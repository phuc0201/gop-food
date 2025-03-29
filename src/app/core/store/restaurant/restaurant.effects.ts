import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { RestaurantService } from "../../services/restaurant.service";
import * as RestaurantActions from './restaurant.actions';

@Injectable()
export class RestaurantEffects {
  constructor(
    private actions$: Actions,
    private restaurantService: RestaurantService
  ) { }

  fetchRestaurants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantActions.fetchRestaurants),
      switchMap(({ cuisineSlug, searchQuery, page, limit, filter }) =>
        this.restaurantService.getRestaurants(cuisineSlug, searchQuery, page, limit, filter)
          .pipe(
            map(response =>
              RestaurantActions.fetchRestaurantsSuccess({ payload: response })),
            catchError(error =>
              of(RestaurantActions.fetchRestaurantsFailure({
                error: error?.message || 'Failed to fetch restaurants'
              })))
          )
      )
    )
  );

  fetchRestaurantDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantActions.fetchRestaurantDetail),
      switchMap(({ restaurantId }) =>
        this.restaurantService.getRestaurantInfo(restaurantId).pipe(
          map(response => RestaurantActions.fetchRestaurantDetailSuccess({ payload: response })),
          catchError(error => of(RestaurantActions.fetchRestaurantDetailFailure({
            error: error?.message || 'Failed to fetch restaurant details'
          })))
        )
      )
    )
  );

  fetchMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantActions.fetchMenu),
      switchMap(({ restaurantId }) =>
        this.restaurantService.getMenu(restaurantId).pipe(
          map(response => RestaurantActions.fetchMenuSuccess({ payload: response })),
          catchError(error => of(RestaurantActions.fetchMenuFailure({
            error: error?.message || 'Failed to fetch menu'
          })))
        )
      )
    )
  );

  fetchFoodDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantActions.fetchFoodDetail),
      switchMap(({ foodId }) =>
        this.restaurantService.getFoodDetails(foodId).pipe(
          map(response => RestaurantActions.fetchFoodDetailSuccess({ payload: response })),
          catchError(error => of(RestaurantActions.fetchFoodDetailFailure({
            error: error?.message || 'Failed to fetch food details'
          })))
        )
      )
    )
  );
}
