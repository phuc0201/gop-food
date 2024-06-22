import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { CuisinesSliderComponent } from 'src/app/shared/component-shared/cuisines-slider/cuisines-slider.component';
import { ListRestaurantComponent } from 'src/app/shared/component-shared/list-restaurant/list-restaurant.component';
import { RestaurantCardComponent } from 'src/app/shared/component-shared/restaurant-card/restaurant-card.component';
import { CuisineCategoryComponent } from './cuisine-category/cuisine-category.component';
import { CuisineFilterComponent } from './cuisine-filter/cuisine-filter.component';
import { CuisinesComponent } from './cuisines/cuisines.component';
const routes: Routes = [
  {
    path: '',
    component: CuisinesComponent,
    title: 'Cuisines',
    children: [
      {
        path: '',
        component: ListRestaurantComponent,
      },
      {
        path: ':slug',
        component: ListRestaurantComponent,
      },
    ]
  },
];
const plugins = [
  RestaurantCardComponent,
  CuisinesSliderComponent,
  ListRestaurantComponent
];
@NgModule({
  declarations: [
    CuisinesComponent,
    CuisineFilterComponent,
    CuisineCategoryComponent,
  ],
  imports: [
    CommonModule,
    plugins,
    RouterModule.forChild(routes),
    TranslateModule,
    FormsModule,
    NzGridModule,
    ReactiveFormsModule,
    NzDrawerModule,
    NzRateModule,
    NzSliderModule,
    NzSliderModule,
    NzDropDownModule,
    NzAutocompleteModule,
    NzRadioModule,
    NzLayoutModule
  ]
})
export class CuisinesPageModule { }
