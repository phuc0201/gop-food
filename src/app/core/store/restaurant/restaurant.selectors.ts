import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RestaurantInfoState, RestaurantListSate } from "./restaurant.state";

export const selectRestaurantListState = createFeatureSelector<RestaurantListSate>('get_restaurant_list');

export const selectRestaurantInfoState = createFeatureSelector<RestaurantInfoState>('get_restaurant_info');


export const selectRestaurantList = createSelector(
  selectRestaurantListState,
  (state) => state
);
export const selectRestaurantInfo = createSelector(
  selectRestaurantInfoState,
  (state) => state
);
