import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { filter } from 'rxjs';
import { Basket } from 'src/app/core/models/order/order.model';
import { OrderService } from 'src/app/core/services/order.service';
import { CartComponent } from 'src/app/shared/component-shared/cart/cart.component';
const plugins = [
  CommonModule,
  RouterModule,
  NzBadgeModule,
  CartComponent
];
@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss'],
  standalone: true,
  imports: plugins
})
export class BottomNavbarComponent implements OnInit {
  openDrawerCart: boolean = false;
  isShowCartBtn: boolean = false;
  foodCount: number = 0;
  isActive: boolean = true;
  activeBottomNavRoute = ['feed', 'user', 'order', 'wishlist'];
  basket = new Basket();
  openDrawer: boolean = false;
  isActiveCardButton: boolean = false;

  constructor(
    private router: Router,
    private orderSrv: OrderService
  ) {
    this.handleBottomNavActive();
  }

  ngOnInit(): void {
    this.isActiveCardButton = this.router.url.startsWith('/restaurant');
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.handleBottomNavActive();
      this.isActiveCardButton = this.router.url.startsWith('/restaurant');
    });

    this.orderSrv.basket.subscribe(basket => {
      this.basket = basket;
    });
  }

  handleBottomNavActive() {
    this.isActive = this.activeBottomNavRoute.some(route => this.router.url.startsWith(`/${route}`));
  }
}
