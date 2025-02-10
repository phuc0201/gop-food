import { Component, inject, OnInit } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { first } from 'rxjs';
import { IconMarker, RoleType } from 'src/app/core/models/common/enums/index.enum';
import { LocationMarker } from 'src/app/core/models/geolocation/location.model';
import { Restaurant } from 'src/app/core/models/restaurant/restaurant.model';
import { GeolocationService } from 'src/app/core/services/geolocation.service';

@Component({
  selector: 'app-restaurant-info-details',
  templateUrl: './restaurant-info-details.component.html',
  styleUrls: ['./restaurant-info-details.component.scss']
})
export class RestaurantInfoDetailsComponent implements OnInit {
  #modal = inject(NzModalRef);
  restaurant: Restaurant = inject(NZ_MODAL_DATA);
  locationMarkers: LocationMarker[] = [];
  customerLocation: [number, number] = [10.850663501572672, 106.77190584520183];

  constructor(
    private geoSrv: GeolocationService
  ) { }

  ngOnInit(): void {
    const restaurnaCoords = [...this.restaurant.location.coordinates];

    this.geoSrv.currLocation.pipe(first()).subscribe({
      next: location => {
        if (location) {
          this.customerLocation = location.coordinates;
          this.locationMarkers = [];
          this.locationMarkers.push(
            new LocationMarker(RoleType.RESTAURANT, IconMarker.RESTAURANT, restaurnaCoords.reverse()),
            new LocationMarker(RoleType.CUSTOMER, IconMarker.CUSTOMER, this.customerLocation)
          );
        }
      },
      error: error => {
        console.error('Error getting customer location:', error);
      }
    });
  }

  closeModal() {
    this.#modal.close();
  }
}
