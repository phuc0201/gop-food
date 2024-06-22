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
  {
    path: 'user',
    component: HeaderStickyLayoutComponent,
    loadChildren: () => import('./my-account-page/my-account-page.module').then(m => m.MyAccountPageModule)
  },
  {
    path: 'wishlist',
    component: HeaderStickyLayoutComponent,
    loadChildren: () => import('./wishlist-page/wishlist-page.module').then(m => m.WishlistPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
