import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Address, AddressSelected } from 'src/app/core/models/geolocation/location.model';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { OrderService } from 'src/app/core/services/order.service';
import { selectAddress } from 'src/app/core/store/geolocation/geolocation.selectors';

@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss']
})
export class MapSelectorComponent implements OnInit{
  #modal = inject(NzModalRef);
  addressList: Address[] = [];
  addressSelected = new AddressSelected();
  location: number[] = [0, 0];

  ngOnInit(): void {
    this.store.select(selectAddress).subscribe(resData => {
      this.addressList = resData.data.results
    })
    this.location = [this.orderSrv.getCartItems().cart.delivery_location.coordinates[1], this.orderSrv.getCartItems().cart.delivery_location.coordinates[0]];
  }

  selectAddress(address: Address){
    this.addressSelected.address = address.formatted_address
    this.addressSelected.coordinates = [address.geometry.location.lng, address.geometry.location.lat]
    this.addressList = []
  }

  confirm() {
    this.#modal.close(this.addressSelected);
  }

  constructor(
    private store: Store,
    private orderSrv: OrderService,
    private geoSrv: GeolocationService,
  ){}
}
