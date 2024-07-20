import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { SystemConstant } from "../constants/system.constant";
import { URLConstant } from "../constants/url.constant";
import { AddressSelected } from "../models/geolocation/location.model";
import { FoodItemPagination, FoodItems } from "../models/restaurant/food-items.model";
import { ModifierGroups } from "../models/restaurant/modifier-groups.model";
import { CategorySlider, RestaurantCategory } from "../models/restaurant/restaurant-category.model";
import { Restaurant } from "../models/restaurant/restaurant.model";
import { GeolocationService } from "./geolocation.service";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private baseURL = URLConstant.API.ENDPOINT;
  private wistlistCount;
  currWishlistCount: Observable<number>;
  constructor(
    private http: HttpClient,
    private geoSrv: GeolocationService
  ) {
    this.wistlistCount = new BehaviorSubject<number>(this.getWishList().length);
    this.currWishlistCount = this.wistlistCount.asObservable();
  }


  getFoodItems(page: number, limit: number, category_id: string = ''): Observable<FoodItemPagination> {
    return this.http.get<FoodItemPagination>(this.baseURL + `/admin/fooditems?page=${page}&limit=${limit}&category_id=${category_id}`);
  }

  getCategories(): Observable<CategorySlider[]> {
    return this.http.get<CategorySlider[]>(this.baseURL + `/admin/${SystemConstant.MERCHANT_ID}/categories`);
  }

  getRestaurants(): Observable<any> {
    return this.geoSrv.currLocation.pipe(
      switchMap((location: AddressSelected) => {
        return this.http.post<any>(this.baseURL + URLConstant.API.RESTAURANT.GET_LIST, {
          coordinates: [location.coordinates[1], location.coordinates[0]]
        });
      })
    );
  }

  getRestaurantInfo(id: string): Observable<Restaurant> {
    return this.geoSrv.currLocation.pipe(
      switchMap((location: AddressSelected) => {
        return this.http.post<Restaurant>(this.baseURL + URLConstant.API.RESTAURANT.GET_INFO + '/' + id, { coordinates: [location.coordinates[1], location.coordinates[0]] });
      })
    );
  }

  getMenu(id: string): Observable<RestaurantCategory<FoodItems<string>>[]> {
    return this.http.get<RestaurantCategory<FoodItems<string>>[]>(this.baseURL + URLConstant.API.RESTAURANT.GET_MENU + '/' + id);
  }

  getFoodDetails(id: string): Observable<FoodItems<ModifierGroups>> {
    return this.http.get<FoodItems<ModifierGroups>>(this.baseURL + URLConstant.API.RESTAURANT.GET_FOOD_DETAILS + id);
  }

  addToWishList(restaurant: Restaurant) {
    let wl = this.getWishList();
    const index = wl.findIndex(item => item._id === restaurant._id);

    if (index !== -1) {
      this.removeItemInWishList(wl[index]._id);
    }
    else {
      wl.push(restaurant);
      localStorage.setItem(
        SystemConstant.WISH_LIST,
        JSON.stringify(wl),
      );
      this.wistlistCount.next(wl.length);
    }
  }

  removeItemInWishList(id: string) {
    let wl = this.getWishList();
    let new_wl = wl.filter(item => item._id !== id);
    localStorage.setItem(
      SystemConstant.WISH_LIST,
      JSON.stringify(new_wl),
    );
    this.wistlistCount.next(new_wl.length);
  }

  getWishList(): Restaurant[] {
    const wl = localStorage.getItem(SystemConstant.WISH_LIST);
    return wl ? JSON.parse(wl) : [];
  }
}
