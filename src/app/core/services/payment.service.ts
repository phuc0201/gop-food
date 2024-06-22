import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLConstant } from '../constants/url.constant';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = URLConstant.API.ENDPOINT;

  constructor(
    private http: HttpClient
  ) { }

  deposit(amount: number): Observable<string> {
    return this.http.post(this.baseUrl + URLConstant.API.PAYMENT.METHOD.VNPAY, {
      amount: amount,
      returnUrl: URLConstant.API.PAYMENT.RETURN_URL
    }, { responseType: 'text' });
  }
}
