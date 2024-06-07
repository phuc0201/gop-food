import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FoodDetailsState, MenuState, RestaurantInfoState, RestaurantListSate } from "./restaurant.state";

export const selectRestaurantListState = createFeatureSelector<RestaurantListSate>('get_restaurant_list');

export const selectRestaurantInfoState = createFeatureSelector<RestaurantInfoState>('get_restaurant_info');

export const selectMenuState = createFeatureSelector<MenuState>('get_menu');

export const selectFoodDetailsSate = createFeatureSelector<FoodDetailsState>('getFoodDetails');


export const selectFoodDetails = createSelector(
  selectFoodDetailsSate,
  (state) => state
);

export const selectRestaurantList = createSelector(
  selectRestaurantListState,
  (state) => state
);

export const selectRestaurantInfo = createSelector(
  selectRestaurantInfoState,
  (state) => state
);

export const selectMenu = createSelector(
  selectMenuState,
  (state) => state
);
