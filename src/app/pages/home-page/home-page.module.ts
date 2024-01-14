import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import { ListRestaurantComponent } from 'src/app/shared/component-shared/list-restaurant/list-restaurant.component';
import { RestaurantCardComponent } from 'src/app/shared/component-shared/restaurant-card/restaurant-card.component';
import { CuisinesSliderComponent } from './cuisines-slider/cuisines-slider.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { HomeComponent } from './home/home.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
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
    CuisinesSliderComponent,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class HomePageModule { }
