import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderHistoryComponent } from './order-history/order-history.component';


const routes: Routes = [
  {
    path: '',
    component: OrderHistoryComponent,
    title: 'Lịch sử đặt hàng'
  }
];

@NgModule({
  declarations: [
    OrderHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OrderHistoryPageModule { }
