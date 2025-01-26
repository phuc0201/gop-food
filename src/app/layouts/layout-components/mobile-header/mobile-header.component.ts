import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, Type, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { IconMarker, RoleType } from 'src/app/core/models/common/enums/index.enum';
import { LocationMarker, SelectedAddress } from 'src/app/core/models/geolocation/location.model';
import { Cart } from 'src/app/core/models/order/order.model';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { OrderService } from 'src/app/core/services/order.service';
import { SearchService } from 'src/app/core/services/search.service';
import { CartComponent } from 'src/app/shared/component-shared/cart/cart.component';
import { MapSelectorComponent } from 'src/app/shared/component-shared/map-selector/map-selector.component';

const plugins = [
  CommonModule,
  NzBadgeModule,
  CartComponent,
  FormsModule
];

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
  standalone: true,
  imports: plugins
})
export class MobileHeaderComponent implements OnInit, OnChanges {
  @Input() scrollTopValue: number = 0;
  isScroll: boolean = false;
  addressSelected = new SelectedAddress();
  basket = new Cart();
  openDrawer: boolean = false;
  activeMobileHeaderRoutes = ['/'];
  isActive: boolean = false;
  searchValue: string = '';
  constructor(
    private geoSrv: GeolocationService,
    private orderSrv: OrderService,
    private modalSrv: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private router: Router,
    private searchSrv: SearchService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['scrollTopValue']) {
      const cuisineList = document.getElementById('cuisine-list');
      if (cuisineList) {
        const rect = cuisineList.getBoundingClientRect();
        this.isScroll = rect.top < 0;
      }
    }
  }

  ngOnInit(): void {
    this.handleMobileHeaderActive();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.handleMobileHeaderActive();
    });
  }

  handleMobileHeaderActive(): void {
    this.isActive = false;
    if (this.router.url == '/') {
      this.isActive = true;
    }
    else if (this.router.url !== '') {
      const url = this.router.url.split('/')[1];
      this.isActive = this.activeMobileHeaderRoutes.includes(url);
    }

    if (this.isActive) {
      this.geoSrv.currLocation.subscribe(location => {
        this.addressSelected = location;
      });
      this.orderSrv.basket.subscribe(cart => this.basket = cart);
    }
  }

  createModal<T>(component: Type<T>, className: string, data: LocationMarker[]) {
    return this.modalSrv.create<T, LocationMarker[]>({
      nzContent: component,
      nzClosable: false,
      nzWrapClassName: className,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
      nzData: data
    });
  }

  showMapSelector() {
    const customerMarker = new LocationMarker(RoleType.CUSTOMER, IconMarker.CUSTOMER, this.addressSelected.coordinates);
    const modalRef = this.createModal(MapSelectorComponent, 'map-selector', [customerMarker]);

    modalRef.afterClose.subscribe((result: SelectedAddress) => {
      if (result !== undefined && result.coordinates.length > 0 && result.address !== '') {
        this.addressSelected = result;
      }
    });
  }

  search(): void {
    if (this.searchValue.trim() !== '') {
      this.searchSrv.setRestaurantSearchQuery(this.searchValue);
      this.router.navigate([URLConstant.ROUTE.CUISINE_PAGE.BASE]);
    }
  }
}
