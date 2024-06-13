import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Store } from '@ngrx/store';
import * as L from 'leaflet';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { searchAddress } from 'src/app/core/store/geolocation/geolocation.actions';
const plugins = [
  CommonModule,
  LeafletModule
]
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: plugins
})
export class MapComponent implements AfterViewInit{
  @Input() address: string = '';
  @Input() enableSelectLocation: boolean = true;
  @Input() zoomValue: number = 15;
  @Input() location: number[] = [this.geoSrv.getLocation()[1],this.geoSrv.getLocation()[0]]
  map!: L.Map;
  currMarker!: L.Marker


  initMap(): void {
    let pinIcon = L.icon({
			iconUrl: 'assets/img/icons/pin.png',
			iconSize: [30, 30]
		})

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

    this.currMarker = L.marker(this.location  as L.LatLngExpression, { icon: pinIcon }).addTo(this.map)
    if(this.enableSelectLocation){
      this.map.on('click', (event: any)=>{
        this.searchAddress(event.latlng.lat, event.latlng.lng)
        if(this.currMarker){
          this.map.removeLayer(this.currMarker)
        }
        this.currMarker = L.marker([ event.latlng.lat, event.latlng.lng ], { icon: pinIcon }).addTo(this.map)
      })
    }
  }

  searchAddress(lat: number, lng: number) {
    const latlng = {
      lat: lat,
      lng: lng
    }
    this.store.dispatch(searchAddress({ latlng: latlng }))
  }

  searchLocation() {

  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  constructor(
    private geoSrv: GeolocationService,
    private store: Store,
  ) { }
}
