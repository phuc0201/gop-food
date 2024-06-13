import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SystemConstant } from "../constants/system.constant";
import { AddressSearchResult } from "../models/geolocation/location.model";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(
    private http: HttpClient
  ){}

  setLocation() {
    this.loadLocaion().subscribe(coords => {
      localStorage.setItem(
        SystemConstant.LOCATION,
        JSON.stringify(coords),
      );
    });
  }

  getLocation(): number[] {
    const lct = localStorage.getItem(SystemConstant.LOCATION);
    return lct ? JSON.parse(lct) : [106.77190584520183, 10.850663501572672];
  }

  loadLocaion(): Observable<number[]> {
    return new Observable<number[]>(observer => {
      if (!navigator.geolocation) {
        console.log('location is not supported');
        observer.error('location is not supported');
      }
      else {
        navigator.geolocation.getCurrentPosition(position => {
          const coords = [position.coords.longitude, position.coords.latitude];
          observer.next(coords);
          observer.complete();
        });
      }
    });
  }

  searchAddressByLocation (lat: number, lng: number): Observable<AddressSearchResult>{
    const apiKey = 'fIDyXkoHiaj9o2MkHjXzm7LogENx4cw7xnyWhxll';
    const apiUrl = `https://rsapi.goong.io/Geocode?latlng=${lat},%20${lng}&api_key=${apiKey}`;
    return this.http.get<AddressSearchResult>(apiUrl)
  }

  searchLocationByAddress (address: string){
    const apiKey = 'fIDyXkoHiaj9o2MkHjXzm7LogENx4cw7xnyWhxll';
    const apiUrl = `https://rsapi.goong.io/geocode?address=${encodeURIComponent(address)}&api_key=${apiKey}`;
    return this.http.get(apiUrl)
  }
}
