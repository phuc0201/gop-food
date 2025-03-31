import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { Basket } from 'src/app/core/models/order/order.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { OrderService } from 'src/app/core/services/order.service';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { SearchService } from 'src/app/core/services/search.service';
import { selectProfile } from 'src/app/core/store/profile/profile.selectors';
import { CartComponent } from 'src/app/shared/component-shared/cart/cart.component';
import { ScrollDirective } from 'src/app/shared/widget/directives/scroll.directive';

const plugins = [
  CommonModule,
  CartComponent,
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
  imports: plugins,
  providers: [
    NzModalService
  ]
})
export class MainHeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('header') header!: ElementRef;
  @Input() isSticky: boolean = false;
  langData: string = 'LAYOUTS.MAIN_LAYOUT.HEADER.';
  currLang?: string = '';
  money: number = 1200000;
  openDrawer: boolean = false;
  isLogged: boolean = false;
  openAuthForm: boolean = false;
  customerAvt: string = '';
  basket = new Basket();
  wishlist: number = 0;
  searchValue: string = '';
  showSearchBar: boolean = false;
  address: string = '';

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
    translate.use(localStorage.getItem('language')?.toString() ?? 'en');
  }

  ngOnInit(): void {
    this.currLang = localStorage.getItem('language')?.toString();
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

    this.geoSrv.currLocation.subscribe(location => {
      this.address = location.address;
    });
  }

  ngAfterViewInit(): void {

  }

  switchLanguage() {
    localStorage.setItem('language', this.currLang ?? 'vi');
    if (this.currLang !== this.translate.currentLang) {
      window.location.reload();
    }
  }

  search(): void {
    this.searchSrv.setRestaurantSearchQuery(this.searchValue);
    if (!this.router.url.includes('cuisines')) {
      this.router.navigate([URLConstant.ROUTE.CUISINE_PAGE.BASE]);
    }
  }

  doLogin() {
    this.authSrv.promptLogin(true);
  }
}
