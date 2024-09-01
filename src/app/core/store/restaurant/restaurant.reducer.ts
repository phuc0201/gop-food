import { createReducer, on } from "@ngrx/store";
import * as restaurantAction from './restaurant.actions';
import { initialFoodDetails, initialMenuState, initialRestaurantInfo, initialRestaurantListSate } from "./restaurant.state";
const _getRestaurantList = createReducer(
  initialRestaurantListSate,
  on(restaurantAction.getRestaurantList, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),

  on(restaurantAction.getRestaurantListSuccess, (state, { result }) => {
    return {
      ...state,
      isLoading: false,
      result: result
    };
  }),

  on(restaurantAction.getRestaurantListFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
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

const _getMenuReducer = createReducer(
  initialMenuState,
  on(restaurantAction.getMenu, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),

  on(restaurantAction.getMenuSuccess, (state, { menu }) => {
    return {
      ...state,
      isLoading: false,
      menu: menu
    };
  }),

  on(restaurantAction.getMenuFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  })
);

const _getFoodDetailsReducer = createReducer(
  initialFoodDetails,
  on(restaurantAction.getFoodDetails, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(restaurantAction.getFoodDetailsSuccess, (state, { foodDetails }) => {
    return {
      ...state,
      foodDetails: foodDetails,
      isLoading: false
    };
  }),
  on(restaurantAction.getFoodDetailsFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
      isLoading: false
    };
  })
);

export function getRestaurantListReducer(state: any, action: any) {
  return _getRestaurantList(state, action);
};

export function getRestaurantInfoReducer(state: any, action: any) {
  return _getRestaurantInfoReducer(state, action);
}

export function getMenuReducer(state: any, action: any) {
  return _getMenuReducer(state, action);
}

export function getFoodDetailsReducer(state: any, action: any) {
  return _getFoodDetailsReducer(state, action);
}
