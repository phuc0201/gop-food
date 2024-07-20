import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { DotsLoaderComponent } from 'src/app/shared/component-shared/loaders/dots-loader/dots-loader.component';
import { FoodDetailsComponent } from './food-details/food-details.component';


const routes: Routes = [
  {
    path: ':id',
    component: FoodDetailsComponent,
    title: 'Food details'
  },
];



@NgModule({
  declarations: [
    FoodDetailsComponent
  ],
  imports: [
    CommonModule,
    NzGridModule,
    NzRateModule,
    FormsModule,
    DotsLoaderComponent,
    NzSkeletonModule,
    NzRadioModule,
    NzCheckboxModule,
    NzEmptyModule,
    NzInputModule,
    RouterModule.forChild(routes)
  ]
})
export class FoodDetailsPageModule { }
