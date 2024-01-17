import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { ResponsiveDrawerDirective } from 'src/app/core/directives/responsive-drawer.directive';
import { ListRestaurantComponent } from 'src/app/shared/component-shared/list-restaurant/list-restaurant.component';
import { CuisineFilterComponent } from './cuisine-filter/cuisine-filter.component';
import { CuisinesComponent } from './cuisines/cuisines.component';
const routes: Routes = [
  {
    path: '',
    component: CuisinesComponent
  }
];

@NgModule({
  declarations: [
    CuisinesComponent,
    CuisineFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ResponsiveDrawerDirective,
    ListRestaurantComponent,
    MatAutocompleteModule,
    MatIconModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NzDrawerModule,
    NzRateModule,
    NzSliderModule
  ]
})
export class CuisinesPageModule { }
