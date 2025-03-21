import { createReducer, on } from "@ngrx/store";
import * as OrderActions from './order.actions';
import { inititalOrderHistoryState } from "./order.state";

export const orderHistoryReducer = createReducer(
  inititalOrderHistoryState,
  on(OrderActions.fetchOrders, (state) => ({
    ...state,
    loading: true
  })),

  on(OrderActions.fetchOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false
  })),

  on(OrderActions.fetchOrdersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
