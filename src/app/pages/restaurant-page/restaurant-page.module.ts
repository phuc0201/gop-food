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
import { HorizontalScrollSliderComponent } from 'src/app/shared/component-shared/horizontal-scroll-slider/horizontal-scroll-slider.component';
import { ImgLoaderComponent } from 'src/app/shared/component-shared/loaders/img-loader/img-loader.component';
import { MapComponent } from 'src/app/shared/component-shared/map/map.component';
import { NoDataComponent } from 'src/app/shared/component-shared/no-data/no-data.component';
import { CampaignDrawerComponent } from './components/campaign-drawer/campaign-drawer.component';
import { CampaignSliderComponent } from './components/campaign-slider/campaign-slider.component';
import { RestaurantInfoDetailsComponent } from './components/restaurant-info-details/restaurant-info-details.component';
import { RestaurantInfoComponent } from './components/restaurant-info/restaurant-info.component';
import { RestaurantMenuComponent } from './components/restaurant-menu/restaurant-menu.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { ReviewDrawerComponent } from './components/review-drawer/review-drawer.component';
import { ReviewSliderComponent } from './components/review-slider/review-slider.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
const routes: Routes = [
  {
    path: '',
    component: RestaurantComponent,
    title: 'Restaurant'
  }
];

const plugins = [
  FoodCardComponent,
  ImgLoaderComponent,
  FoodDetailsComponent,
  NoDataComponent,
  CreateReviewComponent,
  HorizontalScrollSliderComponent,
  MapComponent
];
@NgModule({
  declarations: [
    RestaurantComponent,
    RestaurantInfoComponent,
    RestaurantMenuComponent,
    ReviewCardComponent,
    ReviewSliderComponent,
    ReviewDrawerComponent,
    CampaignSliderComponent,
    CampaignDrawerComponent,
    RestaurantInfoDetailsComponent
  ],
  imports: [
    CommonModule,
    NzRateModule,
    NzSkeletonModule,
    plugins,
    NzDrawerModule,
    NzAutocompleteModule,
    FormsModule,
    NzGridModule,
    RouterModule.forChild(routes)
  ]
})
export class RestaurantPageModule { }
