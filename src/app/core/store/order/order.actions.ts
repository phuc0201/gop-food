import { createAction, props } from "@ngrx/store";
import { OrderHistory } from "../../models/order/order.model";

export const OrderActionTypes = {
  FETCH_ORDER_HISTORY: '[Order] Fetch Order History',
  FETCH_ORDER_HISTORY_SUCCESS: '[Order] Fetch Order History Success',
  FETCH_ORDER_HISTORY_FAILURE: '[Order] Fetch Order History Failure'
};

// Order History
export const fetchOrders = createAction(
  OrderActionTypes.FETCH_ORDER_HISTORY,
  props<{
    filter?: { status: string, searchValue: string; };
  }>()
);

export const fetchOrdersSuccess = createAction(
  OrderActionTypes.FETCH_ORDER_HISTORY_SUCCESS,
  props<{ orders: OrderHistory[]; }>()
);

export const fetchOrdersFailure = createAction(
  OrderActionTypes.FETCH_ORDER_HISTORY_FAILURE,
  props<{ error: string; }>()
);
