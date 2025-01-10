import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { CuisineCategory } from "../../models/cuisine/cuisine-category.model";
import { CuisineService } from "../../services/cuisine.service";
import * as cuisineAction from './cuisine.action';

@Injectable()
export class CuisineEffects {
  constructor(
    private actions$: Actions,
    private cuisineService: CuisineService
  ) { }

  getCuisines$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cuisineAction.getCuisines),
      switchMap(() => this.cuisineService.getCuisineCategories().pipe(
        map((result: CuisineCategory[]) =>
          cuisineAction.getCuisinesSuccess({ result })),
        catchError((error: string) => of(cuisineAction.getCuisinesFailure({ error })))
      ))
    ));
}
