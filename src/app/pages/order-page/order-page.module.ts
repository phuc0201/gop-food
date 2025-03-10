import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzResultModule } from 'ng-zorro-antd/result';
import { CreateReviewComponent } from 'src/app/shared/component-shared/create-review/create-review.component';
import { MapComponent } from 'src/app/shared/component-shared/map/map.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderStatusTrackerComponent } from './components/order-status-tracker/order-status-tracker.component';
import { PaymentNotificationComponent } from './components/payment-notification/payment-notification.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'checkout',
    pathMatch: 'full'
  },
  {
    path: 'checkout',
    component: OrderComponent,
    title: 'Checkout',
  },
  {
    path: 'tracking/:id',
    component: OrderStatusTrackerComponent,
    title: 'Tracking'
  },
];

const plugins = [
  NzPopoverModule,
  NzCheckboxModule,
  NzModalModule,
  MapComponent,
  CreateReviewComponent,
  NzResultModule,
  NzNotificationModule
];
@NgModule({
  declarations: [
    CheckoutComponent,
    CampaignsComponent,
    OrderStatusTrackerComponent,
    OrderComponent,
    PaymentNotificationComponent
  ],
  imports: [
    CommonModule,
    NzGridModule,
    FormsModule,
    RouterModule.forChild(routes),
    plugins
  ],
  providers: [
    NzModalService
  ]
})
export class OrderPageModule { }
