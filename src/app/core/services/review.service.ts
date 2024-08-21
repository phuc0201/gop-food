import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLConstant } from '../constants/url.constant';
import { Review, ReviewDTO } from '../models/review/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = URLConstant.API.ENDPOINT;
  constructor(
    private http: HttpClient
  ) { }

  createReview(dto: ReviewDTO) {
    return this.http.post(this.baseUrl + '/restaurant/review', dto);
  }

  getReviews(id: string): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl + `/restaurant/${id}/reviews`);
  }

  // getReviewForFoodItem(food_id: string): Observable<ReviewFoodItem[]> {
  //   return this.http.get<ReviewFoodItem[]>(this.baseUrl + `/restaurant/reviews/${food_id}`);
  // }

}
