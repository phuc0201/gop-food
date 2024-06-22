import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { skip, take } from 'rxjs';
import { Cart } from 'src/app/core/models/order/order.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { selectToken } from 'src/app/core/store/auth/auth.selectors';
import { selectProfile } from 'src/app/core/store/profile/profile.selectors';
import { AuthComponent } from 'src/app/shared/component-shared/auth/auth.component';
import { CartComponent } from 'src/app/shared/component-shared/cart/cart.component';
import { ScrollDirective } from 'src/app/shared/widget/directives/scroll.directive';

const plugins = [
  CommonModule,
  CartComponent,
  AuthComponent,
  NzBadgeModule,
  TranslateModule,
  NzSelectModule,
  FormsModule,
  RouterModule,
  ScrollDirective
];

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  standalone: true,
  imports: plugins
})
export class MainHeaderComponent implements OnInit {
  @Input() isSticky: boolean = false;
  langData: string = 'LAYOUTS.MAIN_LAYOUT.HEADER.';
  currLang?: string = '';
  money: number = 1200000;
  openDrawer: boolean = false;
  isLogged: boolean = false;
  openAuthForm: boolean = false;
  customerAvt: string = '';
  basket = new Cart();
  wishlist: number = 0;

  switchLanguage() {
    localStorage.setItem('language', this.currLang ?? 'vi');
    if (this.currLang !== this.translate.currentLang) {
      window.location.reload();
    }
  }

  ngOnInit(): void {
    this.currLang = localStorage.getItem('language')?.toString();

    if (this.authSrv.isLogged()) {
      this.isLogged = true;
    }

    this.store.select(selectToken).pipe(
      skip(1),
      take(1)).subscribe((auth) => {
        this.isLogged = auth.accessToken != '';
      });

    this.store.select(selectProfile).subscribe(res => {
      if (res.profile._id === '') {
        this.customerAvt = this.profileSrv.getProfileInSession().avatar;
      } else this.customerAvt = res.profile.avatar;
    });

    this.orderSrv.basket.subscribe(basket => {
      this.basket = basket;
    });

    this.resSrv.currWishlistCount.subscribe(wl => this.wishlist = wl);

  }

  constructor(
    private translate: TranslateService,
    private resSrv: RestaurantService,
    private store: Store,
    private authSrv: AuthService,
    private profileSrv: ProfileService,
    private orderSrv: OrderService
  ) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
  }
}
