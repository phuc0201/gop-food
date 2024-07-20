import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderHistory } from 'src/app/core/models/order/order.model';
import { OrderService } from 'src/app/core/services/order.service';
import { PageLoaderComponent } from '../loaders/page-loader/page-loader.component';
import { NoDataComponent } from '../no-data/no-data.component';

const plugins = [
  CommonModule,
  NoDataComponent,
  FormsModule,
  RouterModule,
  PageLoaderComponent
];

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
  standalone: true,
  imports: plugins
})
export class OrderHistoryComponent implements OnInit {
  orders: OrderHistory[] = [];
  orderForSearch: OrderHistory[] = [];
  searchValue: string = '';
  isLoading: boolean = true;

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

  loadOrders() {
    this.isLoading = true;
    this.orderSrv.getHistory().subscribe({
      next: data => {
        this.orders = data;
        this.orderForSearch = data;
      },
      complete: () => {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    });
  }

  ngOnInit(): void {
    this.loadOrders();
  };

  constructor(
    private orderSrv: OrderService
  ) {
    this.search = this.debounce(this.search.bind(this), 500);
  }
}
