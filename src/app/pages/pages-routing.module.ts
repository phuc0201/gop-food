import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
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
      // {
      //   path: 'wallet',
      //   loadChildren: () => import('./my-account-page/my-account-page.module').then(m => m.MyAccountPageModule)
      // },
      {
        path: 'order',
        loadChildren: () => import('./order-page/order-page.module').then(m => m.OrderPageModule),
        canActivate: [authGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('./my-account-page/my-account-page.module').then(m => m.MyAccountPageModule),
        canActivate: [authGuard]
      },
    ]

  },
  {
    path: 'cuisines',
    component: HeaderStickyLayoutComponent,
    loadChildren: () => import('./cuisines-page/cuisines-page.module').then(m => m.CuisinesPageModule),
  },
  {
    path: 'wishlist',
    component: HeaderStickyLayoutComponent,
    loadChildren: () => import('./wishlist-page/wishlist-page.module').then(m => m.WishlistPageModule)
  },
  {
    path: 'food-details',
    component: HeaderStickyLayoutComponent,
    loadChildren: () => import('./food-details-page/food-details-page.module').then(m => m.FoodDetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
