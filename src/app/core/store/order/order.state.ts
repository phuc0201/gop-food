import { OrderHistory } from "../../models/order/order.model";

export interface OrderHistoryState {
  orders: OrderHistory[],
  loading: boolean,
  error: string | null;
}

export const inititalOrderHistoryState: OrderHistoryState = {
  orders: [],
  loading: false,
  error: null
};
