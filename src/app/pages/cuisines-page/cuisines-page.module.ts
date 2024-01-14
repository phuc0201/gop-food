import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuisinesComponent } from './cuisines/cuisines.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: CuisinesComponent
  }
];
@NgModule({
  declarations: [
    CuisinesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CuisinesPageModule { }
