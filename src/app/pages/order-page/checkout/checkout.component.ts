import { Component, OnInit, Type, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { PaymentMethodData } from 'src/app/core/mock-data/payment-method.data';
import { AddressSelected, LocationMarker } from 'src/app/core/models/geolocation/location.model';
import { Cart, Quote } from 'src/app/core/models/order/order.model';
import { PaymentMethodType } from 'src/app/core/models/payment/payment.model';
import { FoodItemDTO } from 'src/app/core/models/restaurant/food-items.model';
import { Modifier } from 'src/app/core/models/restaurant/modifier.model';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { OrderService } from 'src/app/core/services/order.service';
import { getAllCampaign } from 'src/app/core/store/campaign/campaign.actions';
import { getFoodDetails } from 'src/app/core/store/restaurant/restaurant.actions';
import { IconMarker, RoleType } from 'src/app/core/utils/enums/index.enum';
import { FoodDetailsComponent } from 'src/app/shared/component-shared/food-details/food-details.component';
import { MapSelectorComponent } from '../../../shared/component-shared/map-selector/map-selector.component';
import { CampaignsComponent } from '../campaigns/campaigns.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  basket = new Cart();
  quote = new Quote();
  paymentMethod = PaymentMethodData;
  isSelectPaymentMethod: boolean = false;
  paymentMethodSelected: PaymentMethodType = this.paymentMethod[0];
  discount_value: number = 0;
  addressSelected = new AddressSelected();
  isShowFoodDetails: boolean = false;
  drawerRef?: NzDrawerRef<any, any>;

  createFoodDetailsDrawer(foodItem: FoodItemDTO<Modifier>) {
    this.store.dispatch(getFoodDetails({ id: foodItem.food_id }));
    this.drawerRef = this.drawerSrv.create<FoodDetailsComponent, { modifiersSelected: Modifier[]; }>({
      nzClosable: false,
      nzPlacement: 'right',
      nzWidth: '600px',
      nzHeight: '100%',
      nzWrapClassName: 'food-detail-drawer',
      nzKeyboard: true,
      nzContent: FoodDetailsComponent,
      nzContentParams: {
        modifiersSelected: foodItem.modifiers
      }
    });
  }

  getFoodItemPrice(foodItem: FoodItemDTO<Modifier>): number {
    const totalModifersPrice = foodItem.modifiers.reduce((total, currValue) => {
      return total + currValue.price;
    }, 0);
    return foodItem.base_price ? (foodItem.base_price + totalModifersPrice) * foodItem.quantity : 0;
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
        this.orderSrv.addToCart(this.basket);

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
    modalRef.afterClose.subscribe((result: AddressSelected) => {
      if (result !== undefined && result.coordinates.length > 0 && result.address !== '') {
        this.updateLocation(result.address, result.coordinates);
        this.createQuote();
      }
    });
  }

  selectPaymentMethod(payment: PaymentMethodType): void {
    this.isSelectPaymentMethod = !this.isSelectPaymentMethod;
    this.paymentMethodSelected = payment;
  }

  updateLocation(address: string, coordinates: number[]) {
    this.addressSelected.address = address;
    this.addressSelected.coordinates = coordinates;
    this.basket.cart.delivery_location.address = address;
    this.basket.cart.delivery_location.coordinates = [coordinates[1], coordinates[0]];
    this.orderSrv.addToCart(this.basket);
  }

  placeOrder() {
    const order = this.orderSrv.createOrderDTO(this.basket);
    if (order.items.length > 0) {
      this.router.navigate([URLConstant.ROUTE.ORDER_PAGE.TRACKER]);
    }
  }

  createQuote() {
    const order = this.orderSrv.createOrderDTO(this.basket);
    this.orderSrv.quoteOrder(order).subscribe(data => {
      this.quote = data;
    });
  }

  formatMoney(price: number = 0): string {
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  }

  initData() {
    this.geoSrv.currLocation.subscribe(res => {
      this.basket = this.orderSrv.getCartItems();
      this.addressSelected = res;
      this.basket.cart.delivery_location.address = this.addressSelected.address;
      this.basket.cart.delivery_location.coordinates = [
        this.addressSelected.coordinates[1],
        this.addressSelected.coordinates[0]
      ];
      this.orderSrv.addToCart(this.basket);
    });
  }

  ngOnInit(): void {
    this.initData();
    this.basket.cart.campaign_ids = [];
    this.createQuote();
    this.store.dispatch(getAllCampaign());
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
  ) { }
}
