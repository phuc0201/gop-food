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
        path: 'cuisines',
        loadChildren: () => import('./cuisines-page/cuisines-page.module').then(m => m.CuisinesPageModule),
        title: 'Ẩm thực'
      },
      {
        path: 'orders',
        loadChildren: () => import('./order-history-page/order-history-page.module').then(m => m.OrderHistoryPageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)
      },
      {
        path: 'my-account',
        loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
