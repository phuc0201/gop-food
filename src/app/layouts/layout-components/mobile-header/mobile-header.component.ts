import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, Type, ViewContainerRef } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IconMarker, RoleType } from 'src/app/core/models/common/enums/index.enum';
import { LocationMarker, SelectedAddress } from 'src/app/core/models/geolocation/location.model';
import { Cart } from 'src/app/core/models/order/order.model';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { OrderService } from 'src/app/core/services/order.service';
import { CartComponent } from 'src/app/shared/component-shared/cart/cart.component';
import { MapSelectorComponent } from 'src/app/shared/component-shared/map-selector/map-selector.component';

const plugins = [
  CommonModule,
  NzBadgeModule,
  CartComponent,
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

  constructor(
    private geoSrv: GeolocationService,
    private orderSrv: OrderService,
    private modalSrv: NzModalService,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['scrollTopValue']) {
      const cuisineList = document.getElementById('cuisine-list');
      if (cuisineList) {
        const rect = cuisineList.getBoundingClientRect();
        if (rect.top < 0) {
          this.isScroll = true;
        }
        else {
          this.isScroll = false;
        }
      }
    }
  }

  ngOnInit(): void {
    this.geoSrv.currLocation.subscribe(location => {
      this.addressSelected = location;
    });

    this.orderSrv.basket.subscribe(cart => this.basket = cart);


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
}
