import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
const routes: Routes = [
  {
    path: 'history',
    component: OrderHistoryComponent,
    title: 'Order history'
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    title: 'Trang thanh toán đơn hàng online'
  }
];

const plugins = [
  NzPopoverModule,
  NzCheckboxModule,
  NzModalModule,
]
@NgModule({
  declarations: [
    CheckoutComponent,
    OrderHistoryComponent,
    CampaignsComponent
  ],
  imports: [
    CommonModule,
    NzGridModule,
    RouterModule.forChild(routes),
    plugins
  ]
})
export class OrderPageModule { }
