import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { URLConstant } from "../constants/url.constant";
import { CuisineCategory } from "../models/cuisine/cuisine-category.model";

@Injectable({
  providedIn: "root"
})
export class CuisineService {
  private baseUrl = URLConstant.API.ENDPOINT;

  constructor(
    private http: HttpClient
  ) { }

  getCuisineCategories(): Observable<CuisineCategory[]> {
    return this.http.get<CuisineCategory[]>(this.baseUrl + '/restaurant/cuisine-categories');
  }
}
