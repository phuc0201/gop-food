import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Store } from '@ngrx/store';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { filter } from 'rxjs';
import { Address, LocationMarker } from 'src/app/core/models/geolocation/location.model';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { searchAddress } from 'src/app/core/store/geolocation/geolocation.actions';
import { selectAddress } from 'src/app/core/store/geolocation/geolocation.selectors';
import { IconMarker, RoleType } from 'src/app/core/utils/enums/index.enum';
const plugins = [
  CommonModule,
  LeafletModule
];
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: plugins
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() address: string = '';
  @Input() enableSelectLocation: boolean = true;
  @Input() zoomValue: number = 13;
  @Input() location: number[] = [0, 0];
  @Input() addressList: Address[] = [];
  @Input() locationMarkers: LocationMarker[] = [];
  @Output() addressListChange = new EventEmitter<Address[]>();
  map!: L.Map;
  currMarker!: L.Marker;
  pinIcon = L.icon({
    iconUrl: IconMarker.CUSTOMER,
    iconSize: [50, 50]
  });

  routingControl!: L.Routing.Control;

  initMap(): void {
    this.map = L.map('map', {
      center: this.location as L.LatLngExpression,
      zoom: this.zoomValue
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.handleTracking();

    if (this.enableSelectLocation) {
      this.map.on('click', (event: any) => {
        this.searchAddress(event.latlng.lat, event.latlng.lng);
        this.handleChangeLocation(RoleType.CUSTOMER, event.latlng.lat, event.latlng.lng);
        this.handleTracking();
      });
    }
  }

  handleTracking() {
    const waypoints = this.locationMarkers.map(location => {
      const icon = L.icon({
        iconUrl: location.iconUrl,
        iconSize: [50, 50]
      });
      const marker = L.marker(location.coordinates as L.LatLngExpression, { icon: icon }).addTo(this.map);
      location.marker = marker;
      return marker;
    });

    const routingControl = L.Routing.control({
      waypoints: waypoints.map(marker => marker.getLatLng()),
      routeWhileDragging: true,
      createMarker: () => null,
      show: false,
      collapsible: true,
    } as any)
      .on('routesfound', (e: any) => {
        // if (this.locationMarkers.length > 2) {
        //   const indexDriverMarker = this.locationMarkers.findIndex(location => location.type === RoleType.DRIVER);
        //   const routes = e.routes;
        //   routes[0].coordinates.forEach((coord: L.LatLng, index: number) => {
        //     setTimeout(() => {
        //       this.moveMarker(this.locationMarkers[indexDriverMarker].marker, [coord.lat, coord.lng]);
        //     }, 1000 * index);
        //   });
        // }
      });

    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }
    this.routingControl = routingControl;

    this.routingControl.addTo(this.map);
  }

  handleChangeLocation(type: RoleType, lat: number, lng: number) {
    const indexMarker = this.locationMarkers.findIndex(location => location.type === type);
    if (indexMarker !== -1) {
      const newMarker = this.locationMarkers[indexMarker].marker;
      const coords = [lat, lng];
      this.locationMarkers[indexMarker].coordinates = coords;
      newMarker.setLatLng(coords);
      this.map.removeLayer(this.locationMarkers[indexMarker].marker);
      this.locationMarkers[indexMarker].marker = newMarker;
    }
  }


  moveMarker(marker: any, newLatLng: number[]): void {
    const duration = 1000;
    const startLatLng = marker.getLatLng();
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const newLat = startLatLng.lat + (newLatLng[0] - startLatLng.lat) * progress;
      const newLng = startLatLng.lng + (newLatLng[1] - startLatLng.lng) * progress;

      marker.setLatLng([newLat, newLng]);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  createMarker() {
    this.locationMarkers.forEach(marker => {
      const icon = L.icon({
        iconUrl: marker.iconUrl,
        iconSize: [50, 50]
      });
      const newMarket = L.marker(marker.coordinates as L.LatLngExpression, { icon: icon }).addTo(this.map);
      marker.marker = newMarket;
    });
  }

  searchAddress(lat: number, lng: number) {
    const latlng = {
      lat: lat,
      lng: lng
    };
    this.store.dispatch(searchAddress({ latlng: latlng }));
    const searchResult = this.store.select(selectAddress)
      .pipe(
        filter(res => res.data.results.length > 0)
      )
      .subscribe({
        next: res => this.addressListChange.emit(res.data.results),
        complete: () => {
          searchResult.unsubscribe();
        }
      });
  }

  searchLocation() {

  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  constructor(
    private geoSrv: GeolocationService,
    private store: Store,
  ) { }
}
