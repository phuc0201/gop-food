import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OrderHistoryState } from "./order.state";

export const selectOrderHIstoryState = createFeatureSelector<OrderHistoryState>('orderHistory');

export const selectOrderHistory = createSelector(
  selectOrderHIstoryState,
  state => state
);
