import { AfterViewInit, Component, HostListener, OnInit, Type, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzDrawerPlacement, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter, tap } from 'rxjs';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { PaymentMethodData } from 'src/app/core/mock-data/payment-method.data';
import { IconMarker, PaymentMethod, RoleType } from 'src/app/core/models/common/enums/index.enum';
import { LocationMarker, SelectedAddress } from 'src/app/core/models/geolocation/location.model';
import { Cart, Quote } from 'src/app/core/models/order/order.model';
import { PaymentMethodType } from 'src/app/core/models/payment/payment.model';
import { FoodItemDTO } from 'src/app/core/models/restaurant/food-items.model';
import { Modifier } from 'src/app/core/models/restaurant/modifier.model';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { OrderService } from 'src/app/core/services/order.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { getAllCampaign } from 'src/app/core/store/campaign/campaign.action';
import { getFoodDetails } from 'src/app/core/store/restaurant/restaurant.action';
import { FoodDetailsComponent } from 'src/app/shared/component-shared/food-details/food-details.component';
import { MapSelectorComponent } from '../../../shared/component-shared/map-selector/map-selector.component';
import { CampaignsComponent } from '../campaigns/campaigns.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  basket = new Cart();
  quote = new Quote();
  paymentMethod = PaymentMethodData;
  isSelectPaymentMethod: boolean = false;
  paymentMethodSelected: PaymentMethodType = this.paymentMethod[0];
  discount_value: number = 0;
  addressSelected = new SelectedAddress();
  isShowFoodDetails: boolean = false;
  drawerRef?: NzDrawerRef<any, any>;
  phone: string = '';
  paymentSuccessful: boolean = false;
  paymentFailure: boolean = false;
  placementDrawer: NzDrawerPlacement = 'right';


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
      }
    });
  }

  showMapSelector() {
    const cusLocation = [...this.addressSelected.coordinates];
    const resLocation = [this.basket.cart.restaurant_location[1], this.basket.cart.restaurant_location[0]];
    const restaurantMarker = new LocationMarker(RoleType.RESTAURANT, IconMarker.RESTAURANT, resLocation);
    const customerMarker = new LocationMarker(RoleType.CUSTOMER, IconMarker.CUSTOMER, cusLocation);
    const modalRef = this.createModal(MapSelectorComponent, 'map-selector', [restaurantMarker, customerMarker]);
    modalRef.afterClose.subscribe((result: SelectedAddress) => {
      if (result !== undefined && result.coordinates.length > 0 && result.address !== '') {
        this.createQuote();
      }
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

  payment(amount: number) {
    this.paymentSrv.payForTheBill(amount)
      .pipe(
        filter(res => res !== '' && res !== undefined),
        tap(res => console.log('Response received:', res)) // Log phản hồi
      )
      .subscribe({
        next: res => {
          try {
            const url = new URL(res);
            window.location.href = url.href;
          } catch (e) {
            console.log('Invalid URL:', res);
          }
        },
        error: err => {
          console.log('Error occurred:', err);
        }
      });
  }

  checkPaymentMethod(): void {
    if (this.basket.cart.items.length > 0) {
      if (this.basket.cart.payment_method === PaymentMethod.VNPAY) {
        this.payment(this.quote.total);
      }
      else {
        this.placeOrder();
      }
    }
  }

  placeOrder() {
    const order = this.orderSrv.createOrderDTO(this.basket);
    order.phone = this.phone;

    this.orderSrv.placeOrder(order).subscribe({
      next: data => {
        if (data._id !== undefined) {
          this.router.navigate([URLConstant.ROUTE.ORDER_PAGE.TRACKER + `/${data.order}`]);
        }
        else alert('Nhà hàng đã đóng cửa');
      }
    });
  }

  createQuote() {
    const order = this.orderSrv.createOrderDTO(this.basket);
    order.payment_method = this.paymentMethodSelected.value;
    this.orderSrv.quoteOrder(order).subscribe(data => {
      this.quote = data;
    });
  }

  removeFoodItem(id: string) {
    this.orderSrv.removeFoodItem(id);
  }

  formatMoney(price: number = 0): string {
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  }

  initData() {
    this.orderSrv.basket.subscribe(res => {
      this.basket = this.orderSrv.getCartItems();
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

  ngOnInit(): void {
    this.initData();
    this.basket.cart.campaign_ids = [];
    this.createQuote();
    this.store.dispatch(getAllCampaign());
    this.getCurrentPhone();
    this.handleMobileScreen();
  }

  ngAfterViewInit(): void {

  }

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
    this.route.queryParams.subscribe({
      next: params => {
        if (params['vnp_Amount']) {
          if (params['vnp_ResponseCode'] == '00') {
            this.paymentSuccessful = true;
            setTimeout(() => {
              this.paymentSuccessful = false;
              this.placeOrder();
            }, 1000);
          }
          else {
            this.paymentFailure = true;
            setTimeout(() => {
              this.paymentFailure = false;
              this.router.navigate(['/order/checkout'], { replaceUrl: true });
            }, 1500);
          }
        }
      }
    });
  }
}
