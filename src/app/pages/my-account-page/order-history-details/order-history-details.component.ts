import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocationMarker } from 'src/app/core/models/geolocation/location.model';
import { Cart, Quote } from 'src/app/core/models/order/order.model';
import { FoodItemDTO } from 'src/app/core/models/restaurant/food-items.model';
import { Modifier } from 'src/app/core/models/restaurant/modifier.model';
import { OrderService } from 'src/app/core/services/order.service';
import { IconMarker, OrderStatusTrackerType, RoleType } from 'src/app/core/utils/enums/index.enum';

@Component({
  selector: 'app-order-history-details',
  templateUrl: './order-history-details.component.html',
  styleUrls: ['./order-history-details.component.scss']
})
export class OrderHistoryDetailsComponent implements OnInit {
  basket = new Cart();
  quote = new Quote();
  locationMarkers: LocationMarker[] = [];
  stepper = [
    {
      type: OrderStatusTrackerType.PLACE_ORDER_SUCCESS,
      status: true
    },
    {
      type: OrderStatusTrackerType.RESTAURANT_ACCEPT,
      status: true
    },
    {
      type: OrderStatusTrackerType.DRIVER_ACCEPT,
      status: true
    },
    {
      type: OrderStatusTrackerType.COMPLETED,
      status: true
    }
  ];

  formatMoney(price: number = 0): string {
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  }

  getFoodItemPrice(foodItem: FoodItemDTO<Modifier>): number {
    const totalModifersPrice = foodItem.modifiers.reduce((total, currValue) => {
      return total + currValue.price;
    }, 0);
    return foodItem.base_price ? (foodItem.base_price + totalModifersPrice) * foodItem.quantity : 0;
  }

  createQuote() {
    const order = this.orderSrv.createOrderDTO(this.basket);
    this.orderSrv.quoteOrder(order).subscribe(data => {
      this.quote = data;
    });
  }

  ngOnInit(): void {
    this.basket = this.orderSrv.getCartItems();

    const cusLocation = [...this.basket.cart.delivery_location.coordinates];
    const resLocation = [...this.basket.cart.restaurant_location];

    const restaurantMarker = new LocationMarker(RoleType.RESTAURANT, IconMarker.RESTAURANT, resLocation.reverse());
    const customerMarker = new LocationMarker(RoleType.CUSTOMER, IconMarker.CUSTOMER, cusLocation.reverse());
    const driverMarker = new LocationMarker(RoleType.DRIVER, IconMarker.DRIVER, [10.854476409503809, 106.76874765141007]);

    this.locationMarkers.push(driverMarker);
    this.locationMarkers.push(restaurantMarker);
    this.locationMarkers.push(customerMarker);

    this.createQuote();
  }

  constructor(
    private orderSrv: OrderService,
    private store: Store,
  ) { }
}
