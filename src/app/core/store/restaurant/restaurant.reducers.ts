import { createReducer, on } from "@ngrx/store";
import * as RestaurantActions from './restaurant.actions';
import {
  initialFoodDetailState,
  initialMenuState,
  initialRestaurantDetailState,
  initialRestaurantsState
} from "./restaurant.state";

export const restaurantsReducer = createReducer(
  initialRestaurantsState,
  on(RestaurantActions.fetchRestaurants, (state, { page }) => ({
    ...state,
    isLoadMore: page > 1,
    loading: page === 1
  })),

  on(RestaurantActions.fetchRestaurantsSuccess, (state, { payload }) => {
    const isPagination = payload.currPage > 1;
    const updatedData = isPagination
      ? [
        ...state.restaurants.data,
        ...payload.data
          .filter(newItem =>
            !state.restaurants.data.some(existingItem => existingItem.id === newItem.id))
      ]
      : payload.data;

    return {
      ...state,
      loading: false,
      isLoadMore: false,
      restaurants: {
        ...payload,
        data: updatedData
      }
    };
  }),

  on(RestaurantActions.fetchRestaurantsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export const restaurantDetailReducer = createReducer(
  initialRestaurantDetailState,
  on(RestaurantActions.fetchRestaurantDetail, (state) => ({
    ...state,
    loading: true
  })),

  on(RestaurantActions.fetchRestaurantDetailSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    restaurant: payload
  })),

  on(RestaurantActions.fetchRestaurantDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export const menuReducer = createReducer(
  initialMenuState,
  on(RestaurantActions.fetchMenu, (state) => ({
    ...state,
    loading: true
  })),

  on(RestaurantActions.fetchMenuSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    items: payload
  })),

  on(RestaurantActions.fetchMenuFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export const foodDetailReducer = createReducer(
  initialFoodDetailState,
  on(RestaurantActions.fetchFoodDetail, (state) => ({
    ...state,
    loading: true
  })),

  on(RestaurantActions.fetchFoodDetailSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    food: payload
  })),

  on(RestaurantActions.fetchFoodDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
