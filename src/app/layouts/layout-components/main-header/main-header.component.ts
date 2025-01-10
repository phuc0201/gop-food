import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { filter, tap } from 'rxjs';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { Cart } from 'src/app/core/models/order/order.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { OrderService } from 'src/app/core/services/order.service';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { SearchService } from 'src/app/core/services/search.service';
import { selectProfile } from 'src/app/core/store/profile/profile.selector';
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
  searchValue: string = '';
  showSearchBar: boolean = false;
  address: string = '';

  switchLanguage() {
    localStorage.setItem('language', this.currLang ?? 'vi');
    if (this.currLang !== this.translate.currentLang) {
      window.location.reload();
    }
  }

  search(): void {
    this.searchSrv.setRestaurantSearchQuery(this.searchValue);
    this.router.navigate([URLConstant.ROUTE.CUISINE_PAGE.BASE]);
  }

  ngOnInit(): void {
    this.currLang = localStorage.getItem('language')?.toString();

    this.authSrv.requireLogin$.subscribe({
      next: res => {
        this.openAuthForm = res;
      }
    });

    this.authSrv.currLoginStatus$.subscribe(status => this.isLogged = status);

    this.store.select(selectProfile)
      .subscribe({
        next: res => {
          if (res.profile._id !== '') {
            this.customerAvt = res.profile.avatar;
            this.isLogged = true;
          }
        }
      });

    this.orderSrv.basket.subscribe(basket => {
      this.basket = basket;
    });

    this.resSrv.currWishlistCount.subscribe(wl => this.wishlist = wl);

    if (this.router.url == '/') {
      this.showSearchBar = true;
    }

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap(() => { this.showSearchBar = false; }),
      )
      .subscribe((event: any) => {
        if (this.router.url == '/') {
          this.showSearchBar = true;
        }
      });


    this.geoSrv.currLocation.subscribe(location => {
      this.address = location.address;
    });

  }

  constructor(
    private translate: TranslateService,
    private resSrv: RestaurantService,
    private store: Store,
    private authSrv: AuthService,
    private orderSrv: OrderService,
    private searchSrv: SearchService,
    private router: Router,
    private geoSrv: GeolocationService,
  ) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
  }
}
