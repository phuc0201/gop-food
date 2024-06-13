import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzDrawerComponent, NzDrawerModule, NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { Cart } from 'src/app/core/models/order/order.model';
import { FoodItemDTO } from 'src/app/core/models/restaurant/food-items.model';
import { Modifier } from 'src/app/core/models/restaurant/modifier.model';
import { OrderService } from 'src/app/core/services/order.service';

interface ICart {
  quantity: number
}

const plugins = [
  CommonModule,
  NzDrawerModule,
  TranslateModule,
  NzModalModule,
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
export class CartComponent implements OnChanges, OnInit{
  @Input() opened: boolean = false;
  @Output() openedChange = new EventEmitter<boolean>();
  langData: string = 'SHARED.COMPONENT_SHARED.DRAWER.';
  @ViewChild('cartDrawer') drawer!: NzDrawerComponent;
  placementDrawer: NzDrawerPlacement = 'right';
  urlCheckout = URLConstant.ROUTE.ORDER_PAGE.BASE;
  cartItems = new Cart()

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

  increaseQuantity(product: ICart): void {
    if (product.quantity <= 50) {
      product.quantity += 1;
    }
  }

  decreaseQuantity(product: ICart, index: number): void {
    if (product.quantity > 1) {
      product.quantity -= 1;
    }
    else {

    }
  }

  closeDrawer(): void {
    this.opened = false;
    this.openedChange.emit(this.opened);
  }

  redirecrCheckout() {
    this.closeDrawer();
    this.router.navigate([URLConstant.ROUTE.ORDER_PAGE.BASE])
  }

  getPrice(foodItems: FoodItemDTO<Modifier>): number{
    const totalModifersPrice =foodItems.modifiers.reduce((total, currValue) => {
      return total +  currValue.price;
    }, 0)
    return foodItems.base_price ? (foodItems.base_price + totalModifersPrice)*foodItems.quantity : 0
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkMobileScreen();
    this.cartItems = this.orderSrv.getCartItems()
  }

  ngOnInit(): void {

  }

  constructor(
    private translate: TranslateService,
    private render: Renderer2,
    private orderSrv: OrderService,
    private router: Router
  ) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
  }
}
