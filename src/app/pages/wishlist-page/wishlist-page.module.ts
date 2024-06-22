import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { DotSpinnerComponent } from 'src/app/shared/component-shared/loaders/dot-spinner/dot-spinner.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import { WishlistComponent } from './wishlist/wishlist.component';


const routes: Routes = [
  {
    path: '',
    component: WishlistComponent,
    title: 'wishlist'
  }
];

@NgModule({
  declarations: [
    WishlistComponent,
    RestaurantCardComponent
  ],
  imports: [
    CommonModule,
    DotSpinnerComponent,
    NzGridModule,
    RouterModule.forChild(routes)
  ]
})
export class WishlistPageModule { }
