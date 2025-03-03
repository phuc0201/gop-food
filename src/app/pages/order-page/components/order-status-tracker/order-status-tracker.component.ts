import { AfterViewInit, Component, OnDestroy, OnInit, Type, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { filter, interval, Subject, switchMap, takeUntil } from 'rxjs';
import { BillStatus, IconMarker, OrderStatus, OrderStatusTrackerType, PaymentMethod, RoleType } from 'src/app/core/models/common/enums/index.enum';
import { LocationMarker } from 'src/app/core/models/geolocation/location.model';
import { Basket, OrderDetails, OrderFoodItems } from 'src/app/core/models/order/order.model';
import { OrderService } from 'src/app/core/services/order.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { CreateReviewComponent } from 'src/app/shared/component-shared/create-review/create-review.component';

@Component({
  selector: 'app-order-status-tracker',
  templateUrl: './order-status-tracker.component.html',
  styleUrls: ['./order-status-tracker.component.scss']
})
export class OrderStatusTrackerComponent implements OnInit, OnDestroy, AfterViewInit {
  // @ViewChild(CreateReviewComponent) reviewCmp!: CreateReviewComponent;
  basket = new Basket();
  order = new OrderDetails();
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
  isLoading: boolean = true;
  isVisibleProceedPaymentModal = false;

  constructor(
    private orderSrv: OrderService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NzNotificationService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.getOrderDetails(id);
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.basket.cart.campaign_ids = [];
    this.orderSrv.updateCart(this.basket);
    this.stopPolling.next();
    this.stopPolling.complete();
  }

  showModal(): void {
    this.isVisibleProceedPaymentModal = true;
  }

  handleProcessPayment(): void {
    this.isVisibleProceedPaymentModal = false;
    if (!this.order.bill.total || this.order.bill._id == '') {
      alert('Please fill in all required fields');
      return;
    }

    this.paymentService.createPayment(this.order.bill.total, this.order.bill._id).subscribe({
      next: (res) => {
        window.location.href = res;
      }
    });
  }

  handleCancelPayment(): void {
    this.isVisibleProceedPaymentModal = false;
    this.router.navigate(['']);
  }

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

  getFoodItemPrice(foodItem: OrderFoodItems): number {
    const price = foodItem.foodDetails.price + foodItem.modifiers.reduce((total, curr) => {
      return total + curr.price;
    }, 0);
    return price;
  }

  getOrderDetails(id: string): void {
    this.orderSrv.getOrderDetails(id).pipe(
      filter((res) => res.id !== '')
    ).subscribe({
      next: (res: OrderDetails) => {
        this.order = { ...res };
        console.log(res);

        if (this.order.bill.payment_method !== PaymentMethod.CASH && this.order.bill.status !== BillStatus.PAID) {
          this.isVisibleProceedPaymentModal = true;
        }

        this.locationMarkers = [
          new LocationMarker(RoleType.RESTAURANT, IconMarker.RESTAURANT, res.restaurant.location.coordinates.reverse()),
          new LocationMarker(RoleType.CUSTOMER, IconMarker.CUSTOMER, res.delivery_location.coordinates.reverse())
        ];
        setTimeout(() => {
          this.isLoading = false;
        }, 300);
        if (res.order_status === OrderStatus.PROGRESSING) {
          this.stepper[1].status = true;
          this.stepper[2].status = false;
        }
        if (res.order_status === OrderStatus.COMPLETED) {
          this.stepper[1].status = true;
          this.stepper[2].status = true;
          this.stopPolling.next();
        }
        if (res.order_status === OrderStatus.CANCELLED) {
          this.stepper[1].status = false;
          this.stepper[2].status = false;
          this.stopPolling.next();
        }
      }
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
}
