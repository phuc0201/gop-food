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
import { CategorySliderComponent } from 'src/app/shared/component-shared/category-slider/category-slider.component';
import { CuisinesSliderComponent } from 'src/app/shared/component-shared/cuisines-slider/cuisines-slider.component';
import { ListRestaurantComponent } from 'src/app/shared/component-shared/list-restaurant/list-restaurant.component';
import { PageLoaderComponent } from 'src/app/shared/component-shared/loaders/page-loader/page-loader.component';
import { RestaurantCardComponent } from 'src/app/shared/component-shared/restaurant-card/restaurant-card.component';
import { ListFooditemsComponent } from "../../shared/component-shared/list-fooditems/list-fooditems.component";
import { CuisineCategoryComponent } from './components/cuisine-category/cuisine-category.component';
import { CuisineFilterComponent } from './components/cuisine-filter/cuisine-filter.component';
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
        title: 'Cuisines',
      },
      {
        path: ':id',
        component: ListRestaurantComponent,
        title: 'Cuisines',
      }
    ]
  },
];

const plugins = [
  RestaurantCardComponent,
  CuisinesSliderComponent,
  ListRestaurantComponent,
  CategorySliderComponent,
  PageLoaderComponent
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
    NzDropDownModule,
    NzAutocompleteModule,
    NzRadioModule,
    NzLayoutModule,
    ListFooditemsComponent
  ]
})
export class CuisinesPageModule { }
