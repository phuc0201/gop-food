import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Basket, CreateCartItems, OrderHistory } from 'src/app/core/models/order/order.model';
import { FormatService } from 'src/app/core/services/common/format.serive';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {
  @Input() order = new OrderHistory();
  showDetails: boolean = false;
  reorderOrderId: string = '';
  isReOrdering: boolean = false;

  constructor(
    private formatSrv: FormatService,
    private orderSrv: OrderService,
    private router: Router
  ) { }

  formatDate(date: Date): string {
    return this.formatSrv.formatDate(date.toString());
  }

  onReOrder(): void {
    this.reorderOrderId = this.order._id;
    this.isReOrdering = true;

    this.orderSrv.reOrder(this.order._id).subscribe({
      next: (response: CreateCartItems) => {
        this.isReOrdering = false;
        const basket = new Basket();
        basket.cart = response;
        basket.subtotal = this.orderSrv.caculateSubtotal(basket);
        this.orderSrv.updateCart(basket);

        setTimeout(() => {
          if (response && response.items.length > 0) {
            this.router.navigate(['/order/checkout']);
          }
        }, 500);
      }
    });
  }
}
