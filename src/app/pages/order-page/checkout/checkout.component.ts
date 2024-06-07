import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PaymentMethodData } from 'src/app/core/mock-data/payment-method.data';
import { Cart } from 'src/app/core/models/order/order.model';
import { PaymentMethodType } from 'src/app/core/models/payment/payment.model';
import { FoodItemDTO } from 'src/app/core/models/restaurant/food-items.model';
import { Modifier } from 'src/app/core/models/restaurant/modifier.model';
import { OrderService } from 'src/app/core/services/order.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { CampaignsComponent } from '../campaigns/campaigns.component';
interface IModalData {
  favoriteLibrary: string;
  favoriteFramework: string;
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  basket = new Cart();
  address: string = '';
  paymentMethod = PaymentMethodData;
  isSelectPaymentMethod: boolean = false;
  paymentMethodSelected: PaymentMethodType = this.paymentMethod[0]


  ngOnInit(): void {
    this.basket = this.orderSrv.getCartItems();
    this.address = this.profileSrv.getCustomerProfile().address;
  }

  getPrice(foodItems: FoodItemDTO<Modifier>): number{
    const totalModifersPrice =foodItems.modifiers.reduce((total, currValue) => {
      return total +  currValue.price;
    }, 0)
    return foodItems.base_price ? (foodItems.base_price + totalModifersPrice)*foodItems.quantity : 0
  }

  showPromotion() {
    this.modal.create<CampaignsComponent, IModalData>({
      nzContent: CampaignsComponent,
      nzClosable: false,
      nzWrapClassName: 'campaigns',
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        favoriteLibrary: 'angular',
        favoriteFramework: 'angular'
      },
      nzFooter: null
    });
  }

  selectPaymentMethod(payment: PaymentMethodType): void {
    this.isSelectPaymentMethod = !this.isSelectPaymentMethod
    this.paymentMethodSelected = payment;
  }

  constructor(
    private orderSrv: OrderService,
    private profileSrv: ProfileService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ){}
}
