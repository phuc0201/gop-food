import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuisinesComponent } from './cuisines/cuisines.component';


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
