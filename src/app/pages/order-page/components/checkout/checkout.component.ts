import { Component, HostListener, OnInit, Type, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzDrawerPlacement, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PaymentMethodData } from 'src/app/core/mock-data/payment-method.data';
import { BillStatus, PaymentMethod } from 'src/app/core/models/common/enums/index.enum';
import { LocationMarker, SelectedAddress } from 'src/app/core/models/geolocation/location.model';
import { Basket, Quote } from 'src/app/core/models/order/order.model';
import { PaymentMethodType } from 'src/app/core/models/payment/payment.model';
import { FoodItemDTO } from 'src/app/core/models/restaurant/food-items.model';
import { Modifier } from 'src/app/core/models/restaurant/modifier.model';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { OrderService } from 'src/app/core/services/order.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { getCampaignAvailableForRestaurant } from 'src/app/core/store/campaign/campaign.action';
import { getFoodDetails } from 'src/app/core/store/restaurant/restaurant.action';
import { FoodDetailsComponent } from 'src/app/shared/component-shared/food-details/food-details.component';
import { MapSelectorComponent } from '../../../../shared/component-shared/map-selector/map-selector.component';
import { CampaignsComponent } from '../campaigns/campaigns.component';
import { PaymentNotificationComponent } from '../payment-notification/payment-notification.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  basket = new Basket();
  quote = new Quote();
  paymentMethod = PaymentMethodData;
  isSelectPaymentMethod: boolean = false;
  paymentMethodSelected: PaymentMethodType = this.paymentMethod[0];
  discount_value: number = 0;
  addressSelected = new SelectedAddress();
  isShowFoodDetails: boolean = false;
  drawerRef?: NzDrawerRef<any, any>;
  phone: string = '';
  placementDrawer: NzDrawerPlacement = 'right';

  constructor(
    private orderSrv: OrderService,
    private modal: NzModalService,
    private geoSrv: GeolocationService,
    private viewContainerRef: ViewContainerRef,
    private router: Router,
    private store: Store,
    private campaignSrv: CampaignService,
    private drawerSrv: NzDrawerService,
    private profileService: ProfileService,
    private paymentSrv: PaymentService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['vnp_ResponseCode']) {
        this.handlePaymentReturn(params);
      }
    });
  }

  ngOnInit(): void {
    this.initData();
    this.createQuote();
    this.store.dispatch(getCampaignAvailableForRestaurant({ restaurantId: this.basket.cart.restaurant_id }));
    this.getCurrentPhone();
    this.handleMobileScreen();
  }

  @HostListener('window:resize', ['event'])
  onResize(event: any) {
    this.handleMobileScreen();
  }

  handleMobileScreen() {
    if (window.innerWidth <= 768) {
      this.placementDrawer = 'bottom';
    }
    else this.placementDrawer = 'right';
  }


  createFoodDetailsDrawer(foodItem: FoodItemDTO<Modifier>, index: number) {
    const item = { ...foodItem };
    this.store.dispatch(getFoodDetails({ id: foodItem.food_id }));
    this.drawerRef = this.drawerSrv.create<FoodDetailsComponent, { foodItem: FoodItemDTO<Modifier>; foodItemIndex: number; }>({
      nzClosable: false,
      nzPlacement: this.placementDrawer,
      nzWidth: '600px',
      nzHeight: '100%',
      nzWrapClassName: 'food-detail-drawer',
      nzKeyboard: true,
      nzContent: FoodDetailsComponent,
      nzContentParams: {
        foodItem: item,
        foodItemIndex: index
      }
    });

    this.drawerRef.afterClose.subscribe(() => {
      this.createQuote();
    });
  }

  getFoodItemPrice(foodItem: FoodItemDTO<Modifier>): number {
    const totalModifersPrice = foodItem.modifiers.reduce((total, currValue) => {
      return total + currValue.price;
    }, 0);
    return foodItem.price ? (foodItem.price + totalModifersPrice) * foodItem.quantity : 0;
  }

  createModal<T>(component: Type<T>, className: string, data: LocationMarker[] = []) {
    return this.modal.create<T, LocationMarker[]>({
      nzContent: component,
      nzClosable: false,
      nzWrapClassName: className,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
      nzData: data
    });
  }

  showPromotion() {
    const modalRef = this.createModal(CampaignsComponent, 'campaigns');
    modalRef.afterClose.subscribe(result => {
      if (result !== undefined) {
        this.basket.cart.campaign_ids = result;
        this.orderSrv.updateCart(this.basket);
        this.discount_value = this.campaignSrv.caculateDiscountValue(this.quote.delivery_fare);
        this.createQuote();
      }
    });
  }

  showMapSelector() {
    const modalRef = this.createModal(MapSelectorComponent, 'map-selector');

    modalRef.afterClose.subscribe((result: SelectedAddress) => {
      const observe = this.geoSrv.currLocation.subscribe({
        next: location => {
          this.addressSelected = location;
          this.basket.cart.delivery_location.address = location.address;
          this.basket.cart.delivery_location.coordinates = [...location.coordinates].reverse();
          this.orderSrv.updateCart(this.basket);
          this.createQuote();
        },
        complete: () => {
          observe.unsubscribe();
        }
      });
    });
  }

  selectPaymentMethod(payment: PaymentMethodType): void {
    this.isSelectPaymentMethod = !this.isSelectPaymentMethod;
    this.paymentMethodSelected = payment;
    this.basket.cart.payment_method = payment.value;
    this.orderSrv.updateCart(this.basket);
  }

  updateLocation(address: string, coordinates: [number, number]) {
    this.addressSelected.address = address;
    this.addressSelected.coordinates = coordinates;
    this.basket.cart.delivery_location.address = address;
    this.basket.cart.delivery_location.coordinates = [coordinates[1], coordinates[0]];
    this.orderSrv.updateCart(this.basket);
  }

  processPayment(billId: string) {
    if (!this.quote.total || billId == '') {
      alert('Please fill in all required fields');
      return;
    }

    this.paymentSrv.createPayment(this.quote.total, billId).subscribe({
      next: (res) => {
        window.location.href = res;
      }
    });
  }

  handlePaymentReturn(params: any) {
    this.paymentSrv.handlePaymentReturn(params)
      .subscribe({
        next: (result) => {
          if (result.error === false && result.billId !== '') {
            this.createPaymentResultNotification(BillStatus.PAID, result.billId, result.amount);
          }
          else {
            this.createPaymentResultNotification(BillStatus.FAILED, result.billId, result.amount);
          }
        },
      });
  }

  placeOrder() {
    const order = this.orderSrv.createOrderDTO(this.basket);
    order.phone = this.phone;
    this.orderSrv.placeOrder(order).subscribe({
      next: data => {
        if (data._id !== undefined && data._id !== '') {
          if (PaymentMethod.VNPAY === this.basket.cart.payment_method) {
            this.processPayment(data._id);
          }
          else {
            this.router.navigate(['/order/tracking', data._id]);
          }
        }
        else alert('The restaurant is closed');
      }
    });
  }

  createQuote() {
    const order = this.orderSrv.createOrderDTO(this.basket);
    order.payment_method = this.paymentMethodSelected.value;
    this.orderSrv.quoteOrder(order).subscribe(data => {
      this.quote = data;
      this.discount_value = this.quote.discount;
    });
  }

  removeFoodItem(id: string) {
    this.orderSrv.removeFoodItem(id);

    if (this.basket.cart.items.length === 0) {
      this.router.navigate(['']);
    }
    else this.createQuote();
  }

  formatMoney(price: number = 0): string {
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  }

  initData() {
    this.orderSrv.basket.subscribe(res => {
      if (res.cart.items.length === 0) {
        this.router.navigate(['']);
      }
      else this.basket = this.orderSrv.getCartItems();
    });

    this.paymentMethod.forEach(payment => {
      if (payment.value == this.basket.cart.payment_method) {
        this.paymentMethodSelected = payment;
      }
    });

    this.geoSrv.currLocation.subscribe(res => {
      this.addressSelected = res;
      this.basket.cart.delivery_location.address = this.addressSelected.address;
      this.basket.cart.delivery_location.coordinates = [
        this.addressSelected.coordinates[1],
        this.addressSelected.coordinates[0]
      ];
      this.orderSrv.updateCart(this.basket);
    });
  }

  getCurrentPhone() {
    this.phone = this.profileService.getProfileInSession().phone;
  }

  createPaymentResultNotification(billStatus: BillStatus, billId: string = '', amount: number = 0) {
    return this.modal.create<PaymentNotificationComponent>({
      nzContent: PaymentNotificationComponent,
      nzClosable: false,
      nzWrapClassName: 'payment-modal',
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
      nzData: {
        status: billStatus,
        amount: amount,
        billId: billId
      }
    });
  }
}
