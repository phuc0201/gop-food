import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzDrawerComponent, NzDrawerModule, NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { Basket } from 'src/app/core/models/order/order.model';
import { FoodItemDTO } from 'src/app/core/models/restaurant/food-items.model';
import { Modifier } from 'src/app/core/models/restaurant/modifier.model';
import { OrderService } from 'src/app/core/services/order.service';

const plugins = [
  CommonModule,
  NzDrawerModule,
  TranslateModule,
  RouterModule
];

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: plugins,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnChanges {
  @Input() opened: boolean = false;
  @Output() openedChange = new EventEmitter<boolean>();
  langData: string = 'SHARED.COMPONENT_SHARED.DRAWER.';
  @ViewChild('cartDrawer') drawer!: NzDrawerComponent;
  placementDrawer: NzDrawerPlacement = 'right';
  urlCheckout = URLConstant.ROUTE.ORDER_PAGE.BASE;
  cartItems = new Basket();

  constructor(
    private translate: TranslateService,
    private orderSrv: OrderService,
    private router: Router,
  ) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkMobileScreen();
    this.cartItems = this.orderSrv.getBasket();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobileScreen();
  }

  checkMobileScreen(): void {
    if (window.innerWidth <= 768) {
      this.placementDrawer = 'bottom';
    }
    else this.placementDrawer = 'right';
  }

  increaseQuantity(product: FoodItemDTO<Modifier>): void {
    if (product.quantity <= 50) {
      const index = this.cartItems.cart.items.findIndex(item => item === product);
      this.cartItems.cart.items[index].quantity += 1;
      this.updateCart();
    }
  }

  decreaseQuantity(product: FoodItemDTO<Modifier>): void {
    const index = this.cartItems.cart.items.findIndex(item => item === product);
    if (product.quantity > 1) {
      this.cartItems.cart.items[index].quantity -= 1;
    }
    else {
      this.cartItems.cart.items.splice(index, 1);
    }
    this.updateCart();
  }

  updateCart() {
    this.cartItems.subtotal = this.orderSrv.caculateSubtotal(this.cartItems);
    this.orderSrv.updateCart(this.cartItems);

    if (this.cartItems.cart.items.length === 0)
      this.closeDrawer();
  }

  closeDrawer(): void {
    this.opened = false;
    this.openedChange.emit(this.opened);
  }

  redirectCheckout() {
    this.closeDrawer();
    setTimeout(() => {
      this.router.navigate([URLConstant.ROUTE.ORDER_PAGE.BASE]);
    }, 350);
  }

  getPrice(foodItems: FoodItemDTO<Modifier>): number {
    const totalModifersPrice = foodItems.modifiers.reduce((total, currValue) => {
      return total + currValue.price;
    }, 0);
    return foodItems.price ? (foodItems.price + totalModifersPrice) * foodItems.quantity : 0;
  }
}
