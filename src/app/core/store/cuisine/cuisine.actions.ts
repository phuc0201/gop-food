import { createAction, props } from "@ngrx/store";
import { CuisineCategory } from "../../models/cuisine/cuisine-category.model";

export const GET_CUISINES = 'get cuisines';
export const GET_CUISINES_SUCCESS = 'get cuisines success';
export const GET_CUISINES_FAILURE = 'get cuisines failed';

export const getCuisines = createAction(
  GET_CUISINES
);

export const getCuisinesSuccess = createAction(
  GET_CUISINES_SUCCESS,
  props<{ result: CuisineCategory[]; }>()
);

export const getCuisinesFailure = createAction(
  GET_CUISINES_FAILURE,
  props<{ error: string; }>()
);
