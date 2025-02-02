import { createReducer, on } from "@ngrx/store";
import * as restaurantAction from './restaurant.action';
import { initialFoodDetails, initialMenuState, initialRestaurantInfo, initialRestaurantListSate } from "./restaurant.state";
export const getRestaurantListReducer = createReducer(
  initialRestaurantListSate,
  on(restaurantAction.getRestaurantList, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),

  on(restaurantAction.getRestaurantListSuccess, (state, { result }) => {
    const updatedResult = result.currPage === 1 ? result : {
      ...state.result,
      ...result,
      data: result.currPage === state.result.currPage ? state.result.data : [...state.result.data, ...result.data]
    };
    return {
      ...state,
      isLoading: false,
      result: updatedResult
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

export const getRestaurantInfoReducer = createReducer(
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

export const getMenuReducer = createReducer(
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

export const getFoodDetailsReducer = createReducer(
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
