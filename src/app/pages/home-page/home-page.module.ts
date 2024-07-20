import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { RestaurantCardComponent } from 'src/app/shared/component-shared/restaurant-card/restaurant-card.component';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { CategorySliderComponent } from 'src/app/shared/component-shared/category-slider/category-slider.component';
import { FoodCardComponent } from 'src/app/shared/component-shared/food-card/food-card.component';
import { ListFooditemsComponent } from 'src/app/shared/component-shared/list-fooditems/list-fooditems.component';
import { ListRestaurantComponent } from 'src/app/shared/component-shared/list-restaurant/list-restaurant.component';
import { PageLoaderComponent } from 'src/app/shared/component-shared/loaders/page-loader/page-loader.component';
import { MapComponent } from 'src/app/shared/component-shared/map/map.component';
import { CuisinesSliderComponent } from "../../shared/component-shared/cuisines-slider/cuisines-slider.component";
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
  CategorySliderComponent,
  PromoSliderComponent,
  RestaurantSliderComponent,
  FoodCardComponent,
  MapComponent,
  ListRestaurantComponent,
  ListFooditemsComponent,
  PageLoaderComponent
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
    RouterModule.forChild(routes),
    CuisinesSliderComponent
  ]
})
export class HomePageModule { }
