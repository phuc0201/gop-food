import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, of, switchMap } from "rxjs";
import { SystemConstant } from "../constants/system.constant";
import { URLConstant } from "../constants/url.constant";
import { IPagedResults } from "../models/common/response-data.model";
import { AddressSelected } from "../models/geolocation/location.model";
import { ICuisineFilter } from "../models/restaurant/cuisine-filter.model";
import { FoodItemPagination, FoodItems } from "../models/restaurant/food-items.model";
import { ModifierGroups } from "../models/restaurant/modifier-groups.model";
import { CategorySlider, RestaurantCategory } from "../models/restaurant/restaurant-category.model";
import { Restaurant, RestaurantRecommended } from "../models/restaurant/restaurant.model";
import { GeolocationService } from "./geolocation.service";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private baseURL = URLConstant.API.ENDPOINT;
  private wistlistCount = new BehaviorSubject<number>(this.getWishList().length);
  currWishlistCount: Observable<number> = this.wistlistCount.asObservable();

  constructor(
    private http: HttpClient,
    private geoSrv: GeolocationService
  ) { }

  private constructUrl(endpoint: string): string {
    return `${this.baseURL}${endpoint}`;
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getFoodItems(page: number, limit: number, category_id: string = ''): Observable<FoodItemPagination> {
    return this.http.get<FoodItemPagination>(this.constructUrl(`/fooditems?page=${page}&limit=${limit}&category_id=${category_id}`))
      .pipe(catchError(this.handleError<FoodItemPagination>()));
  }

  getCategories(): Observable<CategorySlider[]> {
    return this.http.get<CategorySlider[]>(this.constructUrl(`categories`))
      .pipe(catchError(this.handleError<CategorySlider[]>()));
  }

  getRestaurants(
    cuisineId?: string,
    searchQuery?: string,
    page: number = 1,
    limit: number = 10,
    filter: ICuisineFilter = {}
  ): Observable<IPagedResults<RestaurantRecommended>> {
    return this.geoSrv.currLocation.pipe(
      switchMap((location: AddressSelected) => {
        let params = new HttpParams()
          .set('coordinates', `${location.coordinates[1]},${location.coordinates[0]}`)
          .set('page', page.toString())
          .set('limit', limit.toString())
          .set('cuisineId', cuisineId || '')
          .set('searchQuery', searchQuery || '');

        Object.entries(filter).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            params = params.set(key, value.toString());
          }
        });
        return this.http.get<IPagedResults<RestaurantRecommended>>(
          this.constructUrl(URLConstant.API.RESTAURANT.GET_LIST),
          { params }
        ).pipe(catchError(this.handleError<IPagedResults<RestaurantRecommended>>()));
      })
    );
  }

  getRestaurantInfo(id: string): Observable<Restaurant> {
    return this.geoSrv.currLocation.pipe(
      switchMap((location: AddressSelected) => {
        const params = new HttpParams()
          .set('coordinates', `${location.coordinates[1]},${location.coordinates[0]}`)
          .set('id', id);
        return this.http.get<Restaurant>(this.constructUrl(URLConstant.API.RESTAURANT.GET_INFO), { params })
          .pipe(catchError(this.handleError<Restaurant>()));
      })
    );
  }

  getMenu(id: string): Observable<RestaurantCategory<FoodItems<string>>[]> {
    return this.http.get<RestaurantCategory<FoodItems<string>>[]>(this.constructUrl(URLConstant.API.RESTAURANT.GET_MENU + '/' + id))
      .pipe(catchError(this.handleError<RestaurantCategory<FoodItems<string>>[]>()));
  }

  getFoodDetails(id: string): Observable<FoodItems<ModifierGroups>> {
    return this.http.get<FoodItems<ModifierGroups>>(this.constructUrl(URLConstant.API.RESTAURANT.GET_FOOD_DETAILS + id))
      .pipe(catchError(this.handleError<FoodItems<ModifierGroups>>()));
  }

  addToWishList(restaurant: RestaurantRecommended) {
    let wl = this.getWishList();
    const index = wl.findIndex(item => item._id === restaurant._id);

    if (index !== -1) {
      this.removeItemInWishList(wl[index]._id);
    } else {
      wl.push(restaurant);
      this.updateWishList(wl);
    }
  }

  removeItemInWishList(id: string) {
    let wl = this.getWishList();
    let new_wl = wl.filter(item => item._id !== id);
    this.updateWishList(new_wl);
  }

  private updateWishList(wl: RestaurantRecommended[]) {
    localStorage.setItem(SystemConstant.WISH_LIST, JSON.stringify(wl));
    this.wistlistCount.next(wl.length);
  }

  getWishList(): RestaurantRecommended[] {
    const wl = localStorage.getItem(SystemConstant.WISH_LIST);
    return wl ? JSON.parse(wl) : [];
  }
}
