import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Store } from '@ngrx/store';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { IconMarker } from 'src/app/core/models/common/enums/index.enum';
import { Address, LocationMarker } from 'src/app/core/models/geolocation/location.model';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
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
  @Input() location: [number, number] = [0, 0];
  @Input() addressList: Address[] = [];
  @Input() locationMarkers: LocationMarker[] = [];
  @Output() addressListChange = new EventEmitter<Address[]>();
  selectedCoordinate: [number, number] = [0, 0];
  map!: L.Map;
  currMarker!: L.Marker;
  pinIcon = L.icon({
    iconUrl: IconMarker.CUSTOMER,
    iconSize: [50, 50]
  });
  isMobile: boolean = false;
  routingControl!: L.Routing.Control;
  isDragging: boolean = false;
  isZooming: boolean = false;

  constructor(
    private geoSrv: GeolocationService,
    private store: Store,
  ) { }

  ngAfterViewInit(): void {
    this.isMobile = window.innerWidth < 768;
    this.initMap();
    if (this.map) {
      this.handleControlMap();
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['location'] && !changes['location'].isFirstChange()) {
      const newLocation = changes['location'].currentValue;
      if (this.map) {
        this.map.setView(newLocation as L.LatLngExpression, this.zoomValue);
        this.selectedCoordinate = newLocation;
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.isMobile = window.innerWidth < 768;
  }

  initMap(): void {
    this.map = L.map('map', {
      center: this.location as L.LatLngExpression,
      zoom: this.zoomValue,
      scrollWheelZoom: 'center',
      zoomControl: false,
    });
    this.selectedCoordinate = this.location;

    const tiles = L.tileLayer(`https://maps.vietmap.vn/api/tm/{z}/{x}/{y}@2x.png?apikey=${'b00c56c4751ac6eb19dd72a48d9c8630d203e6aa8bbb104a'}`, {
      attribution: '© Vietmap',
      maxZoom: 18,
      minZoom: 5,
    }).addTo(this.map);

    tiles.addTo(this.map);
  }

  handleControlMap(): void {
    this.map.on('zoomstart', () => {
      this.isZooming = true;
    });

    this.map.on('zoomend', () => {
      this.isZooming = false;
    });

    this.map.on('dragstart', () => {
      this.isDragging = true;
    });

    this.map.on('dragend', () => {
      this.map.setView([this.map.getCenter().lat, this.map.getCenter().lng]);
      this.searchAddress(this.map.getCenter().lat, this.map.getCenter().lng);
      this.isDragging = false;
    });
  }

  handleCenterLocation() {
    const center = this.map.getCenter();
    this.locationMarkers[0].coordinates = [center.lat, center.lng];
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
    this.geoSrv.searchAddressByLocation(lat, lng).subscribe({
      next: (res) => {
        this.addressListChange.emit(res.results);
      }
    });
  }

  searchLocation() {

  }
}
