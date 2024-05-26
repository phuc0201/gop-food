import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule),
    pathMatch: 'full'
  },
  {
    path: 'cuisines',
    component: MainLayoutComponent,
    loadChildren: () => import('./cuisines-page/cuisines-page.module').then(m => m.CuisinesPageModule),
  },
  {
    path: 'restaurant/:id',
    component: MainLayoutComponent,
    loadChildren: () => import('./restaurant-page/restaurant-page.module').then(m => m.RestaurantPageModule),
  },
  {
    path: 'orders',
    component: MainLayoutComponent,
    loadChildren: () => import('./order-history-page/order-history-page.module').then(m => m.OrderHistoryPageModule)
  },
  {
    path: 'messages',
    component: MainLayoutComponent,
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'profile',
    component: MainLayoutComponent,
    loadChildren: () => import('./profile-page/profile-page.module').then(m => m.ProfilePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
