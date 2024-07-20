import { AfterViewInit, Component, OnDestroy, OnInit, Type, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { interval, Subject, switchMap, takeUntil } from 'rxjs';
import { LocationMarker } from 'src/app/core/models/geolocation/location.model';
import { Cart, Quote } from 'src/app/core/models/order/order.model';
import { FoodItemDTO } from 'src/app/core/models/restaurant/food-items.model';
import { Modifier } from 'src/app/core/models/restaurant/modifier.model';
import { OrderService } from 'src/app/core/services/order.service';
import { IconMarker, OrderStatus, OrderStatusTrackerType, RoleType } from 'src/app/core/utils/enums/index.enum';
import { CreateReviewComponent } from 'src/app/shared/component-shared/create-review/create-review.component';

@Component({
  selector: 'app-order-status-tracker',
  templateUrl: './order-status-tracker.component.html',
  styleUrls: ['./order-status-tracker.component.scss']
})
export class OrderStatusTrackerComponent implements OnInit, OnDestroy, AfterViewInit {
  // @ViewChild(CreateReviewComponent) reviewCmp!: CreateReviewComponent;
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
      status: false
    },
    {
      type: OrderStatusTrackerType.COMPLETED,
      status: false
    }
  ];
  stopPolling = new Subject<void>();
  createModal<T>(component: Type<T>, className: string, data: { title: string, id: string; }) {
    return this.modal.create<T, { title: string, id: string; }>({
      nzContent: component,
      nzClosable: false,
      nzWrapClassName: className,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
      nzData: data
    });
  }


  formatMoney(price: number = 0): string {
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  }

  getFoodItemPrice(foodItem: FoodItemDTO<Modifier>): number {
    const totalModifersPrice = foodItem.modifiers.reduce((total, currValue) => {
      return total + currValue.price;
    }, 0);
    return foodItem.price ? (foodItem.price + totalModifersPrice) * foodItem.quantity : 0;
  }

  createQuote() {
    const order = this.orderSrv.createOrderDTO(this.basket);
    this.orderSrv.quoteOrder(order).subscribe(data => {
      this.quote = data;
    });
  }

  trackingOrder(orderId: string) {
    const subscription = interval(1000)
      .pipe(
        switchMap(() => this.orderSrv.trackingOrder(orderId)),
        takeUntil(this.stopPolling)
      )
      .subscribe(data => {
        if (data.state === OrderStatus.PROGRESSING) {
          this.stepper[1].status = true;
          this.stepper[2].status = false;
        }
        if (data.state === OrderStatus.COMPLETED) {
          this.stepper[1].status = true;
          this.stepper[2].status = true;
          this.stopPolling.next();
        }
        if (data.state === OrderStatus.CANCELLED) {
          this.stepper[1].status = false;
          this.stepper[2].status = false;
          this.createNotification('error');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
          this.stopPolling.next();
        }
      });
  }

  createNotification(type: string): void {
    this.notification.create(
      type,
      'Order rejected',
      'The restaurant has rejected the order'
    );
  }

  review() {
    const modalRef = this.createModal(CreateReviewComponent, 'review-modal', { title: 'How was your food at the restaurant?', id: this.basket.cart.restaurant_id });
    modalRef.afterClose.subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {
    this.basket = this.orderSrv.getCartItems();

    const cusLocation = [...this.basket.cart.delivery_location.coordinates];
    const resLocation = [...this.basket.cart.restaurant_location];

    const restaurantMarker = new LocationMarker(RoleType.RESTAURANT, IconMarker.RESTAURANT, resLocation.reverse());
    const customerMarker = new LocationMarker(RoleType.CUSTOMER, IconMarker.CUSTOMER, cusLocation.reverse());

    this.locationMarkers = [...[restaurantMarker], ...[customerMarker]];

    this.createQuote();

    const id = this.route.snapshot.paramMap.get('id') as string;
    this.trackingOrder(id);
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.createModal(CreateReviewComponent, 'review-modal', { title: 'How did you find our delivery service?', id: '239482432864' });
    // }, 5000);
  }

  ngOnDestroy(): void {
    this.basket.cart.campaign_ids = [];
    this.orderSrv.updateCart(this.basket);
    this.stopPolling.next();
    this.stopPolling.complete();
  }

  constructor(
    private orderSrv: OrderService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NzNotificationService
  ) { }
}
