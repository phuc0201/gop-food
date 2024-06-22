import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, filter, switchMap, tap } from "rxjs";
import { SystemConstant } from "../constants/system.constant";
import { AddressSearchResult, AddressSelected } from "../models/geolocation/location.model";
import { ProfileService } from "./profile.service";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  defaultLocation: AddressSelected = {
    address: 'Trường Đại học Sư phạm Kỹ thuật Tp.HCM',
    coordinates: [10.850663501572672, 106.77190584520183]
  };

  private locationBehavior;
  currLocation: Observable<AddressSelected>;

  constructor(
    private http: HttpClient,
    private profileSrv: ProfileService
  ) {
    this.locationBehavior = new BehaviorSubject<AddressSelected>(this.defaultLocation);
    this.currLocation = this.locationBehavior.asObservable();
  }

  setLocation(location: AddressSelected) {
    this.profileSrv.setAddressSelected(location.address);
    this.locationBehavior.next(location);
    localStorage.setItem(
      SystemConstant.LOCATION,
      JSON.stringify({
        address: location.address,
        coordinates: location.coordinates
      }),
    );
  }

  setLocationByProfile() {
    const profile = this.profileSrv.getProfileInSession();
    const _location = this.searchLocationByAddress(profile.address)
      .pipe(
        filter(res => res.results.length > 0)
      )
      .subscribe({
        next: res => {
          const location = {
            address: profile.address,
            coordinates: [
              res.results[0].geometry.location.lat,
              res.results[0].geometry.location.lng
            ]
          };
          this.setLocation(location);
        },
        complete: () => {
          _location.unsubscribe();
        }
      });
  }


  autoSetLocation(): Observable<AddressSelected> {
    return new Observable<AddressSelected>(observer => {
      this.loadCoordinate()
        .pipe(
          switchMap(coords => this.searchAddressByLocation(coords[0], coords[1])),
          filter(res => res.results.length > 0),
          tap(res => {
            const address: AddressSelected = {
              address: res.results[0].formatted_address,
              coordinates: [
                res.results[0].geometry.location.lat,
                res.results[0].geometry.location.lng
              ]
            };
            observer.next(address);
            observer.complete();
          })
        )
        .subscribe({
          error: err => observer.error(err)
        });
    });
  }

  loadLocation() {
    let lct = localStorage.getItem(SystemConstant.LOCATION);
    if (lct)
      this.locationBehavior.next(JSON.parse(lct));
    else {
      this.setLocationByProfile();
    }
  }

  loadCoordinate(): Observable<number[]> {
    return new Observable<number[]>(observer => {
      if (!navigator.geolocation) {
        const coords = SystemConstant.COORDINATES;
        observer.next(coords);
        observer.complete();
      }
      else {
        navigator.geolocation.getCurrentPosition(
          position => {
            const coords = [position.coords.latitude, position.coords.longitude];
            observer.next(coords);
            observer.complete();
          }
        );
      }
    });
  }

  searchAddressByLocation(lat: number, lng: number): Observable<AddressSearchResult> {
    const apiKey = 'fIDyXkoHiaj9o2MkHjXzm7LogENx4cw7xnyWhxll';
    const apiUrl = `https://rsapi.goong.io/Geocode?latlng=${lat},%20${lng}&api_key=${apiKey}`;
    return this.http.get<AddressSearchResult>(apiUrl);
  }

  searchLocationByAddress(address: string): Observable<AddressSearchResult> {
    const apiKey = 'fIDyXkoHiaj9o2MkHjXzm7LogENx4cw7xnyWhxll';
    const apiUrl = `https://rsapi.goong.io/geocode?address=${encodeURIComponent(address)}&api_key=${apiKey}`;
    return this.http.get<AddressSearchResult>(apiUrl);
  }
}
