import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Address, LocationMarker, SelectedAddress } from 'src/app/core/models/geolocation/location.model';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { SearchService } from 'src/app/core/services/search.service';
import { MapComponent } from 'src/app/shared/component-shared/map/map.component';

const plugins = [
  CommonModule,
  MapComponent,
  FormsModule
];
@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss'],
  standalone: true,
  imports: plugins,
})
export class MapSelectorComponent implements OnInit, AfterViewInit {
  @ViewChild('resultsDrawer', { static: false }) resultsDrawerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('mapContainer', { static: false }) mapContainerRef!: ElementRef<HTMLDivElement>;

  #modal = inject(NzModalRef);
  locationMarkers: LocationMarker[] = inject(NZ_MODAL_DATA);
  addressList: Address[] = [];
  selectedAddressIndex: number = 0;
  selectedAddress = new SelectedAddress();
  location: [number, number] = [0, 0];
  isMapVisible = false;
  resultsDrawerTranslateY: number = 0;
  savedTranslateY: number = 0;
  isDragging: boolean = false;
  startY: number = 0;
  currentY: number = 0;
  isAnimateDragging: boolean = false;
  constructor(
    private geoSrv: GeolocationService,
    private searchSrv: SearchService
  ) {
    this.searchByAddress = this.searchSrv.debounce(this.searchByAddress.bind(this), 500);
  }

  ngOnInit(): void {
    this.geoSrv.currLocation.subscribe(res => {
      this.location = res.coordinates;
      this.selectedAddress = res;
    });
  }

  ngAfterViewInit(): void {

  }

  onTouchStart(event: TouchEvent): void {
    if (event.touches.length !== 1) return;
    this.isDragging = true;
    this.startY = event.touches[0].clientY;
    this.savedTranslateY = this.resultsDrawerTranslateY;
  }

  onTouchMove(event: TouchEvent): void {
    event.preventDefault();
    if (!this.isDragging) return;

    const mapContainerHeight = this.mapContainerRef.nativeElement.getBoundingClientRect().height;
    const mapContainerTop = this.mapContainerRef.nativeElement.getBoundingClientRect().top;
    const mapContainerBottom = this.mapContainerRef.nativeElement.getBoundingClientRect().bottom;
    const resultsDrawerTop = this.resultsDrawerRef.nativeElement.getBoundingClientRect().top;

    this.currentY = event.touches[0].clientY;
    const delta = this.currentY - this.startY;

    if (delta < 0 && mapContainerBottom - resultsDrawerTop >= 0.9 * (mapContainerHeight)) {
      this.resultsDrawerTranslateY += mapContainerTop - resultsDrawerTop;
    }
    else if (delta > 0 && mapContainerBottom - resultsDrawerTop < 0.3 * (mapContainerHeight)) {
      this.resultsDrawerTranslateY = -(.25 * mapContainerHeight);
    }
    else if (mapContainerBottom - resultsDrawerTop >= .25 * (mapContainerHeight)) {
      this.resultsDrawerTranslateY = this.savedTranslateY + delta;
    }
  }

  onTouchEnd(event: TouchEvent): void {
    this.isDragging = false;
  }

  onMouseDownResultsDrawer(event: MouseEvent): void {
    if (event.button !== 0) return;
    this.isDragging = true;
    this.startY = event.clientY;
    this.savedTranslateY = this.resultsDrawerTranslateY;
  }

  onMouseMoveResultsDrawer(event: MouseEvent): void {
    if (!this.isDragging) return;

    const mapContainerHeight = this.mapContainerRef.nativeElement.getBoundingClientRect().height;
    const mapContainerTop = this.mapContainerRef.nativeElement.getBoundingClientRect().top;
    const mapContainerBottom = this.mapContainerRef.nativeElement.getBoundingClientRect().bottom;
    const resultsDrawerTop = this.resultsDrawerRef.nativeElement.getBoundingClientRect().top;

    this.currentY = event.clientY;
    const delta = this.currentY - this.startY;

    if (delta < 0 && mapContainerBottom - resultsDrawerTop >= 0.26 * (mapContainerHeight)) {
      this.isAnimateDragging = true;
      this.isDragging = false;
      this.resultsDrawerTranslateY += mapContainerTop - resultsDrawerTop;
      setTimeout(() => { this.isAnimateDragging = false; }, 500);
    }
    else if (delta > 0 && mapContainerBottom - resultsDrawerTop < 0.98 * (mapContainerHeight)) {
      this.isAnimateDragging = true;
      this.isDragging = false;
      this.resultsDrawerTranslateY = -(.25 * mapContainerHeight);
      setTimeout(() => { this.isAnimateDragging = false; }, 500);
    }
    else if (mapContainerBottom - resultsDrawerTop >= .25 * (mapContainerHeight)) {
      this.resultsDrawerTranslateY = this.savedTranslateY + delta;
    }
  }

  onMouseUpResultsDrawer(event: MouseEvent): void {
    this.isDragging = false;
  }

  selectAddress(address: Address) {
    if (!address) return;

    this.selectedAddress.address = address.formatted_address;
    this.selectedAddress.coordinates = [address.geometry.location.lat, address.geometry.location.lng];
    this.geoSrv.setLocation({
      address: this.selectedAddress.address,
      coordinates: this.selectedAddress.coordinates
    });
    this.isAnimateDragging = true;
    this.resultsDrawerTranslateY = 0;
    setTimeout(() => {
      this.addressList = [];
      this.isAnimateDragging = false;
    }, 500);
  }

  searchByAddress(add: Event): void {
    if (add.target) {
      const target = add.target as HTMLInputElement;
      this.addressList = [];
      if (target.value.trim() !== '') {
        this.geoSrv.searchLocationByAddress(target.value.trim()).subscribe({
          next: (res) => {
            this.addressList = res.results;
          }
        });
      }
    }
  }

  autoDetectLocation(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.geoSrv.autoSetLocation().subscribe({
          next: res => {
            this.selectedAddress.address = res.address;
            this.selectedAddress.coordinates = res.coordinates;
            this.geoSrv.setLocation(this.selectedAddress);
            this.location = res.coordinates;
          },
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert('Unable to automatically retrieve location. Please try again.');
        }
      }
    );
  }

  onMapSelectAddress(address: Address[]): void {
    this.addressList = address;
    if (this.mapContainerRef) {
      const mapContainerHeight = this.mapContainerRef.nativeElement.getBoundingClientRect().height;
      if (address.length > 0) {
        this.isAnimateDragging = true;
        this.resultsDrawerTranslateY = -.25 * mapContainerHeight;
        setTimeout(() => {
          this.isAnimateDragging = false;
        }, 500);
      }
    }
  }

  closeMap(): void {
    this.isMapVisible = false;
    this.addressList = [];
  }

  closeModal(): void {
    this.#modal.close(this.selectedAddress);
  }
}
