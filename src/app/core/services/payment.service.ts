import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URLConstant } from '../constants/url.constant';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = URLConstant.API.ENDPOINT;

  constructor(
    private http: HttpClient
  ) { }

  createPayment(
    amount: number,
    billId: string,
    urlReturn: string = '/order/checkout'): Observable<string> {
    return this.http.post(this.baseUrl + '/payment/vnpay/create', {
      amount: amount,
      billId: billId,
      returnUrl: environment.frontend.domain + urlReturn
    }, { responseType: 'text' });
  }

  handlePaymentReturn(params: any): Observable<any> {
    const queryString = new URLSearchParams(params).toString();
    return this.http.get(`${this.baseUrl}/payment/vnpay/return?${queryString}`);
  }
}
