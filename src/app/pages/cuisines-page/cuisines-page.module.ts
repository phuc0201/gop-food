import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ListRestaurantComponent } from 'src/app/shared/component-shared/list-restaurant/list-restaurant.component';
import { CuisinesComponent } from './cuisines/cuisines.component';
import { CuisineFilterComponent } from './cuisine-filter/cuisine-filter.component';


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
    ListRestaurantComponent,
    MatAutocompleteModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CuisinesPageModule { }
