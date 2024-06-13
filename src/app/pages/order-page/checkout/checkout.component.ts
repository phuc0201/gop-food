import { Component, OnInit, Type, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { PaymentMethodData } from 'src/app/core/mock-data/payment-method.data';
import { Cart, DeliveryLocation, Quote } from 'src/app/core/models/order/order.model';
import { PaymentMethodType } from 'src/app/core/models/payment/payment.model';
import { FoodItemDTO } from 'src/app/core/models/restaurant/food-items.model';
import { Modifier } from 'src/app/core/models/restaurant/modifier.model';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { CampaignsComponent } from '../campaigns/campaigns.component';
import { MapSelectorComponent } from '../map-selector/map-selector.component';

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
  paymentMethodSelected: PaymentMethodType = this.paymentMethod[0]

  getFoodItemPrice(foodItem: FoodItemDTO<Modifier>): number{
    const totalModifersPrice = foodItem.modifiers.reduce((total, currValue) => {
      return total +  currValue.price;
    }, 0)
    return foodItem.base_price ? (foodItem.base_price + totalModifersPrice)*foodItem.quantity : 0
  }

  createModal<T>(component: Type<T>, className: string) {
    return this.modal.create<T, string>({
      nzContent: component,
      nzClosable: false,
      nzWrapClassName: className,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null
    });
  }

  showPromotion() {
    const modalRef = this.createModal(CampaignsComponent, 'campaigns');
    modalRef.afterClose.subscribe(result => {
      if(result && result.length > 0){
        this.basket.cart.campaign_id = result;
        this.orderSrv.addToCart(this.basket);
        const order = this.orderSrv.createOrderDTO(this.basket);
        const _quote = this.orderSrv.quoteOrder(order).subscribe({
          next: data => this.quote = data,
          complete: () => { _quote.unsubscribe(); }
        })
      }
    })
  }

  showMapSelector() {
    const modalRef = this.createModal(MapSelectorComponent, 'map-selector');
    modalRef.afterClose.subscribe((result: DeliveryLocation) =>{
      if(result !== undefined && result["address"] && result["address"] !== ''){
        this.updateLocation(result.address, result.coordinates)
        this.createQuote();
      }
    })

  }

  selectPaymentMethod(payment: PaymentMethodType): void {
    this.isSelectPaymentMethod = !this.isSelectPaymentMethod
    this.paymentMethodSelected = payment;
  }

  updateLocation(address: string, coordinates: number[]) {
    this.basket.cart.delivery_location.address = address;
    this.basket.cart.delivery_location.coordinates = coordinates;
    this.orderSrv.addToCart(this.basket)
  }

  placeOrder() {
    this.router.navigate([URLConstant.ROUTE.ORDER_PAGE.TRACKER])
  }

  createQuote() {
    const order = this.orderSrv.createOrderDTO(this.basket);
    this.orderSrv.quoteOrder(order).subscribe(data => {
      this.quote = data
    })
  }

  formatMoney(price: number = 0): string{
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
  }

  ngOnInit(): void {
    this.basket = this.orderSrv.getCartItems();
    this.basket.cart.campaign_id = [];
    this.orderSrv.addToCart(this.basket)
    const currLocation = this.geoSrv.getLocation();
    this.geoSrv.searchAddressByLocation(currLocation[1], currLocation[0]).subscribe(data => {
      const address = data.results[0].address
      const coordinates = [data.results[0].geometry.location.lng, data.results[0].geometry.location.lat];
      this.updateLocation(address, coordinates);
      this.createQuote();
    })
  }

  constructor(
    private orderSrv: OrderService,
    private profileSrv: ProfileService,
    private modal: NzModalService,
    private geoSrv: GeolocationService,
    private viewContainerRef: ViewContainerRef,
    private router: Router
  ){}
}
