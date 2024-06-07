import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderStickyLayoutComponent } from '../layouts/header-sticky-layout/header-sticky-layout/header-sticky-layout.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule),
        pathMatch: 'full'
      },
      {
        path: 'restaurant/:id',
        loadChildren: () => import('./restaurant-page/restaurant-page.module').then(m => m.RestaurantPageModule),
      },
      {
        path: 'messages',
        loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile-page/profile-page.module').then(m => m.ProfilePageModule)
      },
    ]

  },
  {
    path: 'cuisines',
    component: HeaderStickyLayoutComponent,
    loadChildren: () => import('./cuisines-page/cuisines-page.module').then(m => m.CuisinesPageModule),
  },
  {
    path: 'order',
    component: HeaderStickyLayoutComponent,
    loadChildren: () => import('./order-page/order-page.module').then(m => m.OrderPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
