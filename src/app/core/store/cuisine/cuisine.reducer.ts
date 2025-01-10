import { createReducer, on } from "@ngrx/store";
import * as cuisineAction from './cuisine.action';
import { initialCuisinesState } from "./cuisine.state";
const _cuisinesReducer = createReducer(
  initialCuisinesState,
  on(cuisineAction.getCuisines, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(cuisineAction.getCuisinesSuccess, (state, { result }) => {
    return {
      ...state,
      result: result,
      isLoading: false
    };
  }),
  on(cuisineAction.getCuisinesFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error
    };
  })
);

export function cuisinesReducer(state: any, action: any) {
  return _cuisinesReducer(state, action);
}
