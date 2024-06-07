import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { URLConstant } from "../constants/url.constant";
import { FoodItems } from "../models/restaurant/food-items.model";
import { ModifierGroups } from "../models/restaurant/modifier-groups.model";
import { RestaurantCategory } from "../models/restaurant/restaurant-category.model";
import { Restaurant } from "../models/restaurant/restaurant.model";
import { GeolocationService } from "./geolocation.service";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private baseURL = URLConstant.API.ENDPOINT;

  constructor(
    private http: HttpClient,
    private geolacationSrv: GeolocationService
  ) {}

  getRestaurants(): Observable<any> {
    return this.http.post<any>(this.baseURL + URLConstant.API.RESTAURANT.GET_LIST, {
      coordinates: this.geolacationSrv.getLocation()
    });
  }

  getRestaurantInfo(id: string): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.baseURL + URLConstant.API.RESTAURANT.GET_INFO + '/' + id, { coordinates: this.geolacationSrv.getLocation() });
  }

  getMenu(id: string): Observable<RestaurantCategory<FoodItems<string>>[]> {
    return this.http.get<RestaurantCategory<FoodItems<string>>[]>(this.baseURL + URLConstant.API.RESTAURANT.GET_MENU + '/' + id);
  }

  getFoodDetails(id: string): Observable<FoodItems<ModifierGroups>> {
    return this.http.get<FoodItems<ModifierGroups>>(this.baseURL + URLConstant.API.RESTAURANT.GET_FOOD_DETAILS + id);
  }
}
