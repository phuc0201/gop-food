import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { OrderStatus } from '../models/common/enums/index.enum';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = io(environment.api.baseUrl + '/socket');

  constructor() { }

  onOrderStatus(orderId: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(`order.${orderId}`, (data: {
        orderId: string,
        order_status: OrderStatus;
      }) => {
        observer.next(data);
      });
    });
  }

}
