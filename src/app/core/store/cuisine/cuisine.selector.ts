import { createSelector } from "@ngrx/store";
import { CuisinesState } from "./cuisine.state";

import { createFeatureSelector } from "@ngrx/store";

export const selectCuisinesState = createFeatureSelector<CuisinesState>('cuisines');

export const selectCuisines = createSelector(
  selectCuisinesState,
  (state) => state
);
