import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/core/models/order/order.model';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: OrderHistory[] = [];
  orderForSearch: OrderHistory[] = [];
  searchValue: string = '';

  search(name: string) {
    this.orderForSearch = this.orders.filter(order => {
      let check = order.items.filter(item => this.normalizeString(item.food_name).includes(this.normalizeString(name)));

      if (check.length > 0)
        return true;
      return false;
    });
  }


  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  debounce(func: Function, wait: number) {
    let timeout: any;
    return (...args: any[]) => {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }


  ngOnInit(): void {
    this.orderSrv.getHistory().subscribe(data => {
      this.orders = data;
      this.orderForSearch = data;
    });
  }

  constructor(
    private orderSrv: OrderService
  ) {
    this.search = this.debounce(this.search.bind(this), 500);
  }
}
