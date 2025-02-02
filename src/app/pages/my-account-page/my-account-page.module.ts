import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzResultModule } from 'ng-zorro-antd/result';
import { EWalletComponent } from 'src/app/pages/my-account-page/components/e-wallet/e-wallet.component';
import { PageLoaderComponent } from 'src/app/shared/component-shared/loaders/page-loader/page-loader.component';
import { NoDataComponent } from 'src/app/shared/component-shared/no-data/no-data.component';
import { OtpFormComponent } from 'src/app/shared/component-shared/otp-form/otp-form.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { OrderHistoryDetailsComponent } from './components/order-history-details/order-history-details.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { MyAccountComponent } from './my-account/my-account.component';
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
        path: 'order-history/details/:id',
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
  },
];

const plugins = [
  OtpFormComponent,
  NzModalModule,
  NzResultModule,
  FormsModule,
  PageLoaderComponent,
  NoDataComponent
];

@NgModule({
  declarations: [
    MyAccountComponent,
    ProfileComponent,
    ChangePasswordComponent,
    SidebarMenuComponent,
    EWalletComponent,
    OrderHistoryComponent,
    OrderHistoryDetailsComponent,
  ],
  imports: [
    CommonModule,
    NzGridModule,
    plugins,
    RouterModule.forChild(routes),
  ]
})
export class MyAccountPageModule { }
