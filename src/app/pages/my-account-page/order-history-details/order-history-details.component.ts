import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationMarker } from 'src/app/core/models/geolocation/location.model';
import { Cart, OrderDetails, OrderFoodItems } from 'src/app/core/models/order/order.model';
import { OrderService } from 'src/app/core/services/order.service';
import { OrderStatusTrackerType } from 'src/app/core/utils/enums/index.enum';

@Component({
  selector: 'app-order-history-details',
  templateUrl: './order-history-details.component.html',
  styleUrls: ['./order-history-details.component.scss'],
})
export class OrderHistoryDetailsComponent implements OnInit {
  basket = new Cart();
  orderDetails = new OrderDetails();
  locationMarkers: LocationMarker[] = [];
  isLoading: boolean = true;

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
      type: OrderStatusTrackerType.COMPLETED,
      status: true
    }
  ];

  formatMoney(price: number = 0): string {
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  }

  getFoodItemPrice(foodItem: OrderFoodItems): number {
    const totalModifersPrice = foodItem.foodDetails.price + foodItem.modifiers.reduce((total, currValue) => {
      return total + currValue.price;
    }, 0);
    return totalModifersPrice * foodItem.quantity ?? 0;
  }

  createQuote() {
    const order = this.orderSrv.createOrderDTO(this.basket);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.isLoading = true;
    const observe = this.orderSrv.getOrderDetails(id).subscribe({
      next: data => {
        this.orderDetails = data;
        this.stepper.map(item => {
          if (this.orderDetails.confirm_time == null && item.type === OrderStatusTrackerType.RESTAURANT_ACCEPT) {
            item.status = false;
          }

          if (this.orderDetails.complete_time == null) {
            if (item.type == OrderStatusTrackerType.COMPLETED) {
              item.status = false;
            }
          }
        });
      },
      complete: () => {
        setTimeout(() => {
          this.isLoading = false;
          observe.unsubscribe();
        }, 1000);
      }
    });
  }

  constructor(
    private orderSrv: OrderService,
    private route: ActivatedRoute,
  ) { }
}
