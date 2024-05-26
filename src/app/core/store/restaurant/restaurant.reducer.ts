import { createReducer, on } from "@ngrx/store";
import * as restaurantAction from './restaurant.actions';
import { initialRestaurantInfo, initialRestaurantListSate } from "./restaurant.state";
const _getRestaurantList = createReducer(
  initialRestaurantListSate,
  on(restaurantAction.getRestaurantList, (state) => {
    return {
      ...state
    };
  }),

  on(restaurantAction.getRestaurantListSuccess, (state, { restaurantList }) => {
    return {
      ...state,
      restaurants: restaurantList
    };
  }),

  on(restaurantAction.getRestaurantListFailure, (state, { error }) => {
    return {
      ...state,
      error: error
    };
  })
);


const _getRestaurantInfoReducer = createReducer(
  initialRestaurantInfo,
  on(restaurantAction.getRestaurantInfo, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),

  on(restaurantAction.getRestaurantInfoSuccess, (state, { info }) => {
    return {
      ...state,
      isLoading: false,
      restaurant: info
    };
  }),

  on(restaurantAction.getRestaurantInfoFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  })
);

export function getRestaurantListReducer(state: any, action: any) {
  return _getRestaurantList(state, action);
};

export function getRestaurantInfoReducer(state: any, action: any) {
  return _getRestaurantInfoReducer(state, action);
}
