import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Address, AddressSelected, LocationMarker } from 'src/app/core/models/geolocation/location.model';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { OrderService } from 'src/app/core/services/order.service';
import { MapComponent } from 'src/app/shared/component-shared/map/map.component';

const plugins = [
  CommonModule,
  MapComponent
];
@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss'],
  standalone: true,
  imports: plugins,
})
export class MapSelectorComponent implements OnInit, AfterViewInit {
  #modal = inject(NzModalRef);
  locationMarkers: LocationMarker[] = inject(NZ_MODAL_DATA);
  addressList: Address[] = [];
  addressSelected = new AddressSelected();
  location: number[] = [0, 0];

  ngOnInit(): void {
    this.geoSrv.currLocation.subscribe(res => {
      this.location = res.coordinates;
      this.addressSelected = res;
    });
  }

  selectAddress(address: Address) {
    this.addressList = [];
    this.addressSelected.address = address.formatted_address;
    this.addressSelected.coordinates = [address.geometry.location.lat, address.geometry.location.lng];
  }

  confirm() {
    if (this.addressSelected.address !== '') {
      this.geoSrv.setLocation(this.addressSelected);
    }
    this.#modal.close(this.addressSelected);
  }

  autoGetLocation() {
    let isNewLocation = false;
    this.geoSrv.autoSetLocation().subscribe({
      next: res => {
        this.addressSelected.address = res.address;
        this.addressSelected.coordinates = res.coordinates;
        isNewLocation = true;
      },
    });

    setTimeout(() => {
      if (!isNewLocation) {
        alert('Vui lòng cho phép sử dụng vị trí');
      }
    }, 2000);
  }

  ngAfterViewInit(): void {

  }

  constructor(
    private store: Store,
    private orderSrv: OrderService,
    private geoSrv: GeolocationService,
  ) { }
}
