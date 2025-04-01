import { Component, OnDestroy, OnInit, Type, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { BillStatus, IconMarker, OrderStatus, OrderStatusTrackerType, PaymentMethod, RoleType } from 'src/app/core/models/common/enums/index.enum';
import { LocationMarker } from 'src/app/core/models/geolocation/location.model';
import { Basket, OrderDetails, OrderFoodItems } from 'src/app/core/models/order/order.model';
import { OrderService } from 'src/app/core/services/order.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { CreateReviewComponent } from 'src/app/shared/component-shared/create-review/create-review.component';

@Component({
  selector: 'app-order-status-tracker',
  templateUrl: './order-status-tracker.component.html',
  styleUrls: ['./order-status-tracker.component.scss']
})
export class OrderStatusTrackerComponent implements OnInit, OnDestroy {
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
  isLoading: boolean = true;
  isVisibleProceedPaymentModal = false;

  constructor(
    private orderSrv: OrderService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private socketSrv: SocketService,
    private toastrSrv: ToastrService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['vnp_ResponseCode']) {
        this.handlePaymentReturn(params);
      }
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.getOrderDetails(id);
  }

  ngOnDestroy(): void {

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

    this.paymentService.createPayment(
      this.order.bill.total,
      this.order.bill._id, '/order/tracking/' + this.order.bill._id)
      .subscribe({
        next: (res) => {
          window.location.href = res;
        }
      });
  }

  handlePaymentReturn(params: any) {
    this.paymentService.handlePaymentReturn(params)
      .subscribe({
        next: (result) => {
          if (result.error === false && result.billId !== '') {
            this.toastrSrv.success('Payment processed successfully', 'Success', { timeOut: 3000 });
          }
          else {
            this.toastrSrv.error('Payment failed. Please try again.', 'Error', { timeOut: 3000 });
          }
        },
      });
  }

  handleCancelPayment(): void {
    this.isVisibleProceedPaymentModal = false;
    this.router.navigate(['']);
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
      filter((res) => res._id !== '')
    ).subscribe({
      next: (res: OrderDetails) => {
        this.order = { ...res };

        if (this.order.bill.payment_method !== PaymentMethod.COD && this.order.bill.status !== BillStatus.PAID) {
          this.isVisibleProceedPaymentModal = true;
        }

        this.locationMarkers = [
          new LocationMarker(RoleType.RESTAURANT, IconMarker.RESTAURANT, res.restaurant.location.coordinates.reverse()),
          new LocationMarker(RoleType.CUSTOMER, IconMarker.CUSTOMER, res.delivery_location.coordinates.reverse())
        ];

        setTimeout(() => {
          this.isLoading = false;
        }, 300);

        this.updateStepperStatus(res.order_status);

        this.socketSrv.onOrderStatus(this.order._id).subscribe({
          next: (res) => {
            this.updateStepperStatus(res.order_status);
            if (res.order_status === OrderStatus.COMPLETED) {
              this.createReviewModal();
            }
          }
        });
      }
    });
  }

  updateStepperStatus(orderStatus: OrderStatus): void {
    switch (orderStatus) {
      case OrderStatus.PROGRESSING:
        this.stepper[1].status = true;
        this.stepper[2].status = false;
        break;
      case OrderStatus.COMPLETED:
        this.stepper[1].status = true;
        this.stepper[2].status = true;
        break;
      case OrderStatus.CANCELLED:
        this.stepper[1].status = false;
        this.stepper[2].status = false;
        break;
      default:
        break;
    }
  }

  createModal<T>(component: Type<T>, className: string, data: any) {
    return this.modal.create<T, any>({
      nzContent: component,
      nzClosable: false,
      nzWrapClassName: className,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
      nzData: data
    });
  }

  createReviewModal() {
    const modalRef = this.createModal(CreateReviewComponent, 'review-modal', {
      title: 'How was your food at the restaurant?',
      id: this.order.restaurant._id
    });

    modalRef.afterClose.subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
