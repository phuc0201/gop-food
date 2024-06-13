import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SearchState } from "./geolocation.state";

export const selectAddressByLocationState = createFeatureSelector<SearchState>('search_address')

export const selectAddress = createSelector(
  selectAddressByLocationState,
  (state) => state
)
