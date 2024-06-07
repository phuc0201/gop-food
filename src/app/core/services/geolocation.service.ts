import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SystemConstant } from "../constants/system.constant";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
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
    return lct ? JSON.parse(lct) : [0, 0];
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
}
