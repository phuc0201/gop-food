import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cart, Quote } from 'src/app/core/models/order/order.model';
import { FoodItemDTO } from 'src/app/core/models/restaurant/food-items.model';
import { Modifier } from 'src/app/core/models/restaurant/modifier.model';
import { OrderService } from 'src/app/core/services/order.service';
import { OrderStatusTrackerType } from 'src/app/core/utils/enums/index.enum';

@Component({
  selector: 'app-order-status-tracker',
  templateUrl: './order-status-tracker.component.html',
  styleUrls: ['./order-status-tracker.component.scss']
})
export class OrderStatusTrackerComponent implements OnInit, OnDestroy{

  basket = new Cart();
  quote =  new Quote();
  stepper = [
    {
      type: OrderStatusTrackerType.PLACE_ORDER_SUCCESS,
      status: true
    },
    {
      type: OrderStatusTrackerType.RESTAURANT_ACCEPT,
      status: false
    },
    {
      type: OrderStatusTrackerType.DRIVER_ACCEPT,
      status: false
    },
    {
      type: OrderStatusTrackerType.COMPLETED,
      status: false
    }
  ]

  formatMoney(price: number = 0): string{
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
  }

  getFoodItemPrice(foodItem: FoodItemDTO<Modifier>): number{
    const totalModifersPrice = foodItem.modifiers.reduce((total, currValue) => {
      return total +  currValue.price;
    }, 0)
    return foodItem.base_price ? (foodItem.base_price + totalModifersPrice)*foodItem.quantity : 0
  }

  createQuote() {
    const order = this.orderSrv.createOrderDTO(this.basket);
    this.orderSrv.quoteOrder(order).subscribe(data => {
      this.quote = data
    })
  }

  ngOnInit(): void {
    this.basket = this.orderSrv.getCartItems();
    this.createQuote();
  }

  ngOnDestroy(): void {
    this.basket.cart.campaign_id = []
    this.orderSrv.addToCart(this.basket)
  }

  constructor(
    private orderSrv: OrderService,
    private store: Store,
  ){}
}
