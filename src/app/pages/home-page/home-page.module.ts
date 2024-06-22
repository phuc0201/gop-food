import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { RestaurantCardComponent } from 'src/app/shared/component-shared/restaurant-card/restaurant-card.component';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { CuisinesSliderComponent } from 'src/app/shared/component-shared/cuisines-slider/cuisines-slider.component';
import { FoodCardComponent } from 'src/app/shared/component-shared/food-card/food-card.component';
import { ListRestaurantComponent } from 'src/app/shared/component-shared/list-restaurant/list-restaurant.component';
import { MapComponent } from 'src/app/shared/component-shared/map/map.component';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { HomeComponent } from './home/home.component';
import { NewAndEventsComponent } from './new-and-events/new-and-events.component';
import { OurMenuComponent } from './our-menu/our-menu.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { PromoSliderComponent } from './promo-slider/promo-slider.component';
import { RestaurantSliderComponent } from './restaurant-slider/restaurant-slider.component';
import { SearchLocationComponent } from './search-location/search-location.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Food delivery online'
  }
];

const plugins = [
  HomeSliderComponent,
  RestaurantCardComponent,
  CuisinesSliderComponent,
  PromoSliderComponent,
  RestaurantSliderComponent,
  FoodCardComponent,
  MapComponent,
  ListRestaurantComponent
];

@NgModule({
  declarations: [
    HomeComponent,
    SearchLocationComponent,
    NewAndEventsComponent,
    OurServicesComponent,
    OurMenuComponent,
  ],
  imports: [
    CommonModule,
    plugins,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NzAutocompleteModule,
    NzGridModule,
    RouterModule,
    RouterModule.forChild(routes)
  ]
})
export class HomePageModule { }
