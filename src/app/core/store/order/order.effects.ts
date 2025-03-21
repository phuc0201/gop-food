import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { OrderService } from "../../services/order.service";
import * as OrderActions from './order.actions';

@Injectable()
export class OrderEffects {
  constructor(
    private actions$: Actions,
    private orderSrv: OrderService
  ) { }

  fetchOrderHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.fetchOrders),
      switchMap(() =>
        this.orderSrv.getOrderHistory()
          .pipe(
            map(response =>
              OrderActions.fetchOrdersSuccess({ orders: response })),
            catchError(error =>
              of(OrderActions.fetchOrdersFailure({
                error: error?.message || 'Failed to fetch order history'
              })))
          )
      )
    )
  );
}
