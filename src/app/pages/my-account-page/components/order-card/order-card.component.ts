import { Component, Input } from '@angular/core';
import { OrderHistory } from 'src/app/core/models/order/order.model';
import { FormatService } from 'src/app/core/services/common/format.serive';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {
  @Input() order = new OrderHistory();
  showDetails: boolean = false;

  constructor(
    private formatSrv: FormatService
  ) { }

  formatDate(date: Date): string {
    return this.formatSrv.formatDate(date.toString());
  }
}
