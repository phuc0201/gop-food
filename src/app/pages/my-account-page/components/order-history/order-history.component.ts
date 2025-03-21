import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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

  constructor(
    private store: Store
  ) {
    // this.search = this.debounce(this.search.bind(this), 500);
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.hanldeMobileScreen();
  }

  hanldeMobileScreen(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  // search(name: string) {
  //   this.orderForSearch = this.orders.filter(order => {
  //     let check = order.items.filter(item => this.normalizeString(item.food_name).includes(this.normalizeString(name)));

  //     if (check.length > 0)
  //       return true;
  //     return false;
  //   });

  //   this.isNoData = this.orderForSearch.length == 0;
  // }


  // normalizeString(str: string): string {
  //   return str
  //     .normalize('NFD')
  //     .replace(/[\u0300-\u036f]/g, '')
  //     .toLowerCase();
  // }

  // debounce(func: Function, wait: number) {
  //   let timeout: any;
  //   return (...args: any[]) => {
  //     const later = () => {
  //       clearTimeout(timeout);
  //       func.apply(this, args);
  //     };
  //     clearTimeout(timeout);
  //     timeout = setTimeout(later, wait);
  //   };
  // }

  // loadOrders() {
  //   this.isLoading = true;
  //   this.isNoData = false;
  //   this.orderSrv.getHistory().subscribe({
  //     next: data => {
  //       this.orders = data;
  //       this.orderForSearch = data;
  //     },
  //     complete: () => {
  //       this.isLoading = false;
  //       if (this.orderForSearch.length == 0) {
  //         this.isNoData = true;
  //       }
  //     }
  //   });
  // }
}
