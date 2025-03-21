import { Component, Input } from '@angular/core';
import { OrderHistory } from 'src/app/core/models/order/order.model';

@Component({
  selector: 'app-order-history-list',
  templateUrl: './order-history-list.component.html',
  styleUrls: ['./order-history-list.component.scss']
})
export class OrderHistoryListComponent {
  @Input() orders: OrderHistory[] = [];
}
