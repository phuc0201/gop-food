import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzResultModule } from 'ng-zorro-antd/result';
import { CreateReviewComponent } from 'src/app/shared/component-shared/create-review/create-review.component';
import { MapComponent } from 'src/app/shared/component-shared/map/map.component';
import { NotificationComponent } from 'src/app/shared/component-shared/notification/notification.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderStatusTrackerComponent } from './components/order-status-tracker/order-status-tracker.component';
const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent,
    title: 'Trang thanh toán đơn hàng online'
  },
  {
    path: 'tracker/:id',
    component: OrderStatusTrackerComponent,
    title: 'Theo dõi đơn hàng'
  }
];

const plugins = [
  NzPopoverModule,
  NzCheckboxModule,
  NzModalModule,
  MapComponent,
  NotificationComponent,
  CreateReviewComponent,
  NzResultModule,
  NzNotificationModule
];
@NgModule({
  declarations: [
    CheckoutComponent,
    CampaignsComponent,
    OrderStatusTrackerComponent
  ],
  imports: [
    CommonModule,
    NzGridModule,
    FormsModule,
    RouterModule.forChild(routes),
    plugins
  ]
})
export class OrderPageModule { }
