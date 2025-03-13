import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FoodDetailState, MenuState, RestaurantDetailState, RestaurantsState } from "./restaurant.state";

export const selectRestaurantsState = createFeatureSelector<RestaurantsState>('restaurants');
export const selectRestaurantDetailState = createFeatureSelector<RestaurantDetailState>('restaurantDetail');
export const selectMenuState = createFeatureSelector<MenuState>('menu');
export const selectFoodDetailState = createFeatureSelector<FoodDetailState>('foodDetail');

export const selectAllRestaurants = createSelector(
  selectRestaurantsState,
  state => state
);

export const selectRestaurantDetail = createSelector(
  selectRestaurantDetailState,
  state => state
);

export const selectMenuItems = createSelector(
  selectMenuState,
  state => state
);

export const selectFoodDetail = createSelector(
  selectFoodDetailState,
  state => state
);
