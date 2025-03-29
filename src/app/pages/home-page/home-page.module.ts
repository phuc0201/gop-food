import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { RestaurantCardComponent } from 'src/app/shared/component-shared/restaurant-card/restaurant-card.component';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { CategorySliderComponent } from 'src/app/shared/component-shared/category-slider/category-slider.component';
import { FoodCardComponent } from 'src/app/shared/component-shared/food-card/food-card.component';
import { ListBlogsComponent } from 'src/app/shared/component-shared/list-blogs/list-blogs.component';
import { ListRestaurantComponent } from 'src/app/shared/component-shared/list-restaurant/list-restaurant.component';
import { PageLoaderComponent } from 'src/app/shared/component-shared/loaders/page-loader/page-loader.component';
import { MapComponent } from 'src/app/shared/component-shared/map/map.component';
import { CuisinesSliderComponent } from "../../shared/component-shared/cuisines-slider/cuisines-slider.component";
import { HomeSliderComponent } from './components/home-slider/home-slider.component';
import { NearbyRestaurantsComponent } from './components/nearby-restaurants/nearby-restaurants.component';
import { NewAndEventsComponent } from './components/new-and-events/new-and-events.component';
import { OurMenuComponent } from './components/our-menu/our-menu.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { PromoSliderComponent } from './components/promo-slider/promo-slider.component';
import { RestaurantSliderComponent } from './components/restaurant-slider/restaurant-slider.component';
import { SearchLocationComponent } from './components/search-location/search-location.component';
import { HomeComponent } from './home/home.component';
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
  CategorySliderComponent,
  PromoSliderComponent,
  RestaurantSliderComponent,
  FoodCardComponent,
  MapComponent,
  ListRestaurantComponent,
  PageLoaderComponent,
  NzPopoverModule,
  RestaurantCardComponent,
  ListBlogsComponent
];

@NgModule({
  declarations: [
    HomeComponent,
    SearchLocationComponent,
    NewAndEventsComponent,
    OurServicesComponent,
    OurMenuComponent,
    NearbyRestaurantsComponent,
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
    RouterModule.forChild(routes),
    CuisinesSliderComponent
  ],
  providers: [
    NzModalService
  ]
})
export class HomePageModule { }
