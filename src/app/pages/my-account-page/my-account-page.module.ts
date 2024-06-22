import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NoDataComponent } from 'src/app/shared/component-shared/no-data/no-data.component';
import { OtpFormComponent } from 'src/app/shared/component-shared/otp-form/otp-form.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EWalletComponent } from './e-wallet/e-wallet.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { OrderHistoryDetailsComponent } from './order-history-details/order-history-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
const routes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Thông tin cá nhân'
      },
      {
        path: 'order-history',
        component: OrderHistoryComponent,
        title: 'Lịch sử đặt hàng'
      },
      {
        path: 'order-history/details',
        component: OrderHistoryDetailsComponent,
        title: 'Chi tiết đơn hàng'
      },
      {
        path: 'wallet',
        component: EWalletComponent,
        title: 'Ví điện tử'
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        title: 'Thay đổi mật khẩu'
      }
    ]
  }
];

const plugins = [
  OtpFormComponent,
  NzModalModule,
  NoDataComponent,
  NzResultModule
];

@NgModule({
  declarations: [
    MyAccountComponent,
    EWalletComponent,
    ProfileComponent,
    ChangePasswordComponent,
    SidebarMenuComponent,
    OrderHistoryComponent,
    OrderHistoryDetailsComponent
  ],
  imports: [
    CommonModule,
    NzGridModule,
    plugins,
    RouterModule.forChild(routes),
  ]
})
export class MyAccountPageModule { }
