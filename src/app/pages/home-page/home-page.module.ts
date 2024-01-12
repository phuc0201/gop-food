import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import { TranslateModule } from '@ngx-translate/core';
import { RestaurantCardComponent } from 'src/app/shared/component-shared/restaurant-card/restaurant-card.component';
import { ListRestaurantComponent } from 'src/app/shared/component-shared/list-restaurant/list-restaurant.component';
import { CuisinesSliderComponent } from './cuisines-slider/cuisines-slider.component';


@NgModule({
  declarations: [
    HomeComponent,
    SearchLocationComponent,
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    HomeSliderComponent,
    TranslateModule,
    RestaurantCardComponent,
    ListRestaurantComponent,
    CuisinesSliderComponent
  ]
})
export class HomePageModule { }
