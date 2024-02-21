import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { ListRestaurantComponent } from 'src/app/pages/cuisines-page/list-restaurant/list-restaurant.component';
import { RestaurantCardComponent } from 'src/app/shared/component-shared/restaurant-card/restaurant-card.component';
import { ResponsiveDrawerDirective } from 'src/app/shared/widget/directives/responsive-drawer.directive';
import { CuisineFilterComponent } from './cuisine-filter/cuisine-filter.component';
import { CuisinesComponent } from './cuisines/cuisines.component';

const routes: Routes = [
  {
    path: '',
    component: CuisinesComponent,
    children: [
      {
        path: ':slug',
        component: ListRestaurantComponent,
      },
    ]
  },
];
const plugins = [
  RestaurantCardComponent
];
@NgModule({
  declarations: [
    CuisinesComponent,
    CuisineFilterComponent,
    ListRestaurantComponent,
  ],
  imports: [
    CommonModule,
    plugins,
    RouterModule.forChild(routes),
    ResponsiveDrawerDirective,
    MatAutocompleteModule,
    MatIconModule,
    TranslateModule,
    FormsModule,
    NzGridModule,
    ReactiveFormsModule,
    NzDrawerModule,
    NzRateModule,
    NzSliderModule,
    NzAutocompleteModule,
    NzLayoutModule
  ]
})
export class CuisinesPageModule { }
