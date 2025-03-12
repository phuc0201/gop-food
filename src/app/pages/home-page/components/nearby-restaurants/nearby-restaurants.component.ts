import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { IconMarker } from 'src/app/core/models/common/enums/index.enum';
import { RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';

@Component({
  selector: 'app-nearby-restaurants',
  templateUrl: './nearby-restaurants.component.html',
  styleUrls: ['./nearby-restaurants.component.scss']
})
export class NearbyRestaurantsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('popupRestaurantOnMapTemplate', { static: true }) popupRestaurantOnMapTemplate!: TemplateRef<any>;
  @Input() displayMap: boolean = false;
  @Output() displayMapChange = new EventEmitter<boolean>();
  map!: L.Map;
  currDistance: number = 20; // 20km
  isShowFullMap: boolean = false;
  coordinates: [number, number] = [10.850663501572672, 106.77190584520183];
  restaurants: RestaurantRecommended[] = [];
  markers: L.Marker[] = [];
  private distanceChange$ = new Subject<number>();
  private destroy$ = new Subject<void>();

  constructor(
    private resSrv: RestaurantService,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      behavior: "instant"
    });

    this.distanceChange$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((distance) => this.resSrv.getRestaurantsNearby(this.coordinates, distance * 1000)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          this.restaurants = res;
          this.clearMarkers();
          if (res.length > 0) {
            this.createMarkers();
          }
        }
      });
  }

  ngAfterViewInit(): void {
    const location = localStorage.getItem(SystemConstant.LOCATION);
    if (location && this.currDistance <= 50) {
      const coordinates = JSON.parse(location).coordinates;
      this.initMap(coordinates);
      this.coordinates = coordinates;
      this.fetchRestaurantsNearby();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initMap(coords: number[]): void {
    this.map = L.map('restaurantsOnMap', {
      center: this.coordinates as L.LatLngExpression,
      zoom: 15,
      zoomControl: false
    });

    const tiles = L.tileLayer(`https://maps.vietmap.vn/api/tm/{z}/{x}/{y}@2x.png?apikey=${'b00c56c4751ac6eb19dd72a48d9c8630d203e6aa8bbb104a'}`, {
      attribution: '© Vietmap',
      maxZoom: 18,
      minZoom: 5,
    }).addTo(this.map);

    tiles.addTo(this.map);

    const icon = L.icon({
      iconUrl: IconMarker.CUSTOMER,
      iconSize: [50, 50]
    });

    L.marker(coords as L.LatLngExpression, { icon: icon }).addTo(this.map);
  }

  fetchRestaurantsNearby(): void {
    this.distanceChange$.next(this.currDistance);
  }

  onRestaurantCardHover(restaurant: RestaurantRecommended, isHover: boolean = false): void {
    const marker = this.markers.find(m => {
      const markerCoords = (m.getLatLng() as L.LatLng).wrap();
      const restaurantCoords = L.latLng(restaurant.location?.coordinates as L.LatLngExpression).wrap();
      return markerCoords.equals(restaurantCoords);
    });

    if (marker) {
      const popupContent = this.createPopupHtml(restaurant);
      if (isHover) {
        marker.bindPopup(popupContent).openPopup();
        this.map.setView(marker.getLatLng());
      } else {
        marker.closePopup();
      }
    }
  }

  createMarkers() {
    if (!this.map) {
      console.error('Map is not initialized');
      return;
    }

    this.restaurants.forEach(restaurant => {
      const customIcon = L.divIcon({
        html: this.createMarkerHtml(restaurant),
        className: 'custom-marker-icon',
        iconSize: restaurant.isClosed ? [24, 24] : [32, 32],
        iconAnchor: [15, 15]
      });

      const marker = L.marker(
        restaurant.location?.coordinates as L.LatLngExpression,
        { icon: customIcon }
      ).addTo(this.map);

      marker.on('click', () => {
        const popupContent = this.createPopupHtml(restaurant);
        L.popup()
          .setLatLng(restaurant.location?.coordinates as L.LatLngExpression)
          .setContent(popupContent)
          .openOn(this.map);

        const popupElements = document.querySelectorAll('.popup-content');
        popupElements.forEach(popupElement => {
          popupElement.addEventListener('click', () => {
            this.navigateToRestaurant(restaurant.id);
          });
        });
      });

      this.markers.push(marker);
    });

    if (this.markers.length > 0) {
      const group = L.featureGroup(this.markers);
      this.map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  }

  clearMarkers() {
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });
    this.markers = [];
  }

  createMarkerHtml(restaurant: RestaurantRecommended) {
    if (!restaurant.isClosed) {
      return `
    <button class="custom-marker w-8 h-8 rounded-full text-xs font-bold hover:text-white flex items-center justify-center bg-white">
    ${restaurant.rating == 0 ? `<i class="fa-solid fa-utensils"></i>` : (restaurant.rating >= 4 ? `<img style="width: 20px;" src=${'assets/img/icons/medal.png'}/>` : restaurant.rating.toFixed(1))}
    </button>
      `;
    }
    else {
      return `
       <button class="custom-marker marker-dot w-8 h-8 rounded-full flex items-center justify-center">
          <div class="w-2 h-2 bg-white rounded-full"></div>
        </button>
      `;
    }
  }

  createPopupHtml(restaurant: RestaurantRecommended): string {
    const view = this.popupRestaurantOnMapTemplate.createEmbeddedView({ $implicit: restaurant });
    view.detectChanges();
    return view.rootNodes.map(node => node.outerHTML).join('');
  }

  navigateToRestaurant(restaurantId: string): void {
    this.router.navigate(['/restaurant', restaurantId]);
  }

  getDistance(distance: number): string {
    return (distance / 1000).toFixed(2) + 'km';
  }

  getDuration(duration: number): string {
    const minutes = Math.round(duration / 60);
    return minutes < 60 ? `${minutes}m` : `${Math.floor(minutes / 60)}h`;
  }

  showFullMap(): void {
    this.isShowFullMap = !this.isShowFullMap;
    setTimeout(() => {
      this.map.invalidateSize();
    }, 150);
  }

  toggleDisplayMap(): void {
    document.getElementById('header')?.classList.remove('header-sticky');
    this.displayMap = !this.displayMap;
    this.displayMapChange.emit(this.displayMap);
  }

  increaseDistance(): void {
    if (this.currDistance < 50) {
      this.currDistance += 5;
      this.fetchRestaurantsNearby();
    }
  }

  decreaseDistance(): void {
    if (this.currDistance > 5) {
      this.currDistance -= 5;
      this.fetchRestaurantsNearby();
    }
  }
}
