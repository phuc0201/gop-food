import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { URLConstant } from "../constants/url.constant";
import { IRestaurantInfo } from "../models/common/response-data.model";
import { GeolocationService } from "./geolocation.service";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private baseURL = URLConstant.API.ENDPOINT;
  constructor(
    private http: HttpClient,
    private geolacationSrv: GeolocationService
  ) { }

  getRestaurants(): Observable<any> {
    return this.http.post<any>(this.baseURL + URLConstant.API.RESTAURANT.GET_LIST, {
      coordinates: this.geolacationSrv.getLocation()
    });
  }

  getRestaurantInfo(id: string): Observable<IRestaurantInfo> {
    return this.http.post<IRestaurantInfo>(this.baseURL + URLConstant.API.RESTAURANT.GET_INFO + '/' + id, { coordinates: this.geolacationSrv.getLocation() });
  }
}
