import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// Removed unused import of debounce from 'rxjs'
import { OrderHistory } from 'src/app/core/models/order/order.model';
import { fetchOrders } from 'src/app/core/store/order/order.actions';
import { selectOrderHistory } from 'src/app/core/store/order/order.selectors';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  orders: OrderHistory[] = [];
  orderForSearch: OrderHistory[] = [];
  searchValue: string = '';
  isLoading: boolean = true;
  isMobile: boolean = false;
  isNoData: boolean = false;
  orders$ = this.store.select(selectOrderHistory);
  selectedOrderStatus: string = '';

  constructor(
    private store: Store
  ) {
    this.search = this.debounce(this.search.bind(this), 500);
  }

  ngOnInit(): void {
    this.hanldeMobileScreen();
    this.store.dispatch(fetchOrders({}));
    this.store.select(selectOrderHistory).subscribe({
      next: (res) => {
        this.isNoData = !res.loading && res.orders.length === 0;
      }
    });
  };

  onSelectStatus(status: string) {
    this.selectedOrderStatus = status;
    this.store.dispatch(fetchOrders({
      filter: {
        status: status,
        searchValue: this.searchValue
      }
    }));
  }

  search(value: string) {
    this.searchValue = value;
    this.store.dispatch(fetchOrders({
      filter: {
        status: this.selectedOrderStatus,
        searchValue: value
      }
    }));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.hanldeMobileScreen();
  }

  hanldeMobileScreen(): void {
    this.isMobile = window.innerWidth <= 768;
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
}
