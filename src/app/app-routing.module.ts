import { NgModule } from '@angular/core';
import { ExtraOptions, provideRouter, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    title: ''
  },
];

const scrollOption: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};


@NgModule({
  imports: [RouterModule.forRoot(routes, scrollOption)],
  providers: [
    provideRouter(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
