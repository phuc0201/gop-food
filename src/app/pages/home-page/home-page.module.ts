import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FoodCardComponent } from 'src/app/shared/component-shared/food-card/food-card.component';
import { RestaurantCardComponent } from 'src/app/shared/component-shared/restaurant-card/restaurant-card.component';
import { CuisinesSliderComponent } from './cuisines-slider/cuisines-slider.component';
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
    title: 'Giao đồ ăn trực tuyến'
  }
];

const plugins = [
  HomeSliderComponent,
  RestaurantCardComponent,
  CuisinesSliderComponent,
  PromoSliderComponent,
  RestaurantSliderComponent,
  FoodCardComponent
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
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    NzGridModule,
    RouterModule,
    RouterModule.forChild(routes)
  ]
})
export class HomePageModule { }
