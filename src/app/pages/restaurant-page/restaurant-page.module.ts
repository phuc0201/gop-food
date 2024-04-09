import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantComponent } from './restaurant/restaurant.component';
const routes: Routes = [
  {
    path: '',
    component: RestaurantComponent,
    title: 'Nhà hàng'
  }
];

@NgModule({
  declarations: [
    RestaurantComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RestaurantPageModule { }
