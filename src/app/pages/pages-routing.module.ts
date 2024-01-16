import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)
      },
      {
        path: 'cuisines/:filter',
        loadChildren: () => import('./cuisines-page/cuisines-page.module').then(m => m.CuisinesPageModule),
        title: 'Ẩm thực'
      },
      {
        path: 'cuisines',
        loadChildren: () => import('./cuisines-page/cuisines-page.module').then(m => m.CuisinesPageModule),
        title: 'Ẩm thực'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
