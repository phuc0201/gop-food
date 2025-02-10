import { Component, OnInit, Type, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { LocationMarker, SelectedAddress } from 'src/app/core/models/geolocation/location.model';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { SearchService } from 'src/app/core/services/search.service';
import { MapSelectorComponent } from 'src/app/shared/component-shared/map-selector/map-selector.component';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss'],
})
export class SearchLocationComponent implements OnInit {
  langData: string = 'PAGES.HOME_PAGE.SEARCH_LOCATION.';
  listResult: string[] = [];
  filteredAddress: string[] = [];
  address = ['Số 1 VVN', 'UFM', '92 Hoàng Diệu', 'IIG Tp.HCM'];
  selectedAddress = new SelectedAddress();
  searchValue: string = '';

  createModal<T>(component: Type<T>, className: string, data: LocationMarker[]) {
    return this.modal.create<T, LocationMarker[]>({
      nzContent: component,
      nzClosable: false,
      nzWrapClassName: className,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
      nzData: data
    });
  }

  showMapSelector() {
    // const customerMarker = new LocationMarker(RoleType.CUSTOMER, IconMarker.CUSTOMER, this.selectedAddress.coordinates);
    const modalRef = this.createModal(MapSelectorComponent, 'map-selector', []);

    modalRef.afterClose.subscribe((result: SelectedAddress) => {
      if (result !== undefined && result.coordinates.length > 0 && result.address !== '') {
        this.selectedAddress = result;
      }
    });
  }

  search(): void {
    this.searchSrv.setRestaurantSearchQuery(this.searchValue);
    this.router.navigate([URLConstant.ROUTE.CUISINE_PAGE.BASE]);
  }

  onChange(value: string): void {
    if (value) {
      this.filteredAddress = this.address.filter(adr => adr.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
  }


  loadAddress() {
    const profile = this.profileSrv.getProfileInSession();
    const _location = this.geoSrv.searchLocationByAddress(profile.address).pipe(
      filter(res => res.results.length > 0)
    ).subscribe({
      next: res => {
        this.selectedAddress.address = profile.address;
        this.selectedAddress.coordinates = [
          res.results[0].geometry.location.lat,
          res.results[0].geometry.location.lng,
        ];
      },
      complete: () => {
        _location.unsubscribe();
      }
    });
  }

  ngOnInit(): void {
    this.geoSrv.currLocation.subscribe((location) => {
      this.selectedAddress = location;
    });
  }

  constructor(
    private translate: TranslateService,
    private searchSrv: SearchService,
    private modal: NzModalService,
    private router: Router,
    private profileSrv: ProfileService,
    private geoSrv: GeolocationService,
    private viewContainerRef: ViewContainerRef,
  ) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
    this.filteredAddress = this.address;
  }
}
