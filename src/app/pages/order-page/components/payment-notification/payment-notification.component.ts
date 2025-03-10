import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { BillStatus } from 'src/app/core/models/common/enums/index.enum';

@Component({
  selector: 'app-payment-notification',
  templateUrl: './payment-notification.component.html',
  styleUrls: ['./payment-notification.component.scss']
})
export class PaymentNotificationComponent implements OnInit {
  notifyData: {
    status: BillStatus,
    amount: number,
    billId: string,
  } = inject(NZ_MODAL_DATA);

  #modal = inject(NzModalRef);

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onTrackOrder() {
    this.#modal.close();
    setTimeout(() => {
      this.router.navigate([`/order/tracking/${this.notifyData.billId}`]);
    }, 320);
  }

  onClose() {
    this.#modal.close();
  }
}
