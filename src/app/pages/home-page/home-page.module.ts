import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    HomeComponent,
    SearchLocationComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    HomeSliderComponent,
    TranslateModule
  ]
})
export class HomePageModule { }
