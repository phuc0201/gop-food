import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { CreateReviewComponent } from 'src/app/shared/component-shared/create-review/create-review.component';
import { FoodCardComponent } from 'src/app/shared/component-shared/food-card/food-card.component';
import { FoodDetailsComponent } from 'src/app/shared/component-shared/food-details/food-details.component';
import { ImgLoaderComponent } from 'src/app/shared/component-shared/loaders/img-loader/img-loader.component';
import { NoDataComponent } from 'src/app/shared/component-shared/no-data/no-data.component';
import { RatingsAndReviewsComponent } from './ratings-and-reviews/ratings-and-reviews.component';
import { RestaurantInfoComponent } from './restaurant-info/restaurant-info.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
const routes: Routes = [
  {
    path: '',
    component: RestaurantComponent,
    title: 'Restaurant'
  }
];

const pluggin = [
  FoodCardComponent,
  ImgLoaderComponent,
  FoodDetailsComponent,
  NoDataComponent,
  CreateReviewComponent
];
@NgModule({
  declarations: [
    RestaurantComponent,
    RestaurantInfoComponent,
    RestaurantMenuComponent,
    RatingsAndReviewsComponent
  ],
  imports: [
    CommonModule,
    NzRateModule,
    NzSkeletonModule,
    pluggin,
    NzDrawerModule,
    NzAutocompleteModule,
    FormsModule,
    NzGridModule,
    RouterModule.forChild(routes)
  ]
})
export class RestaurantPageModule { }
