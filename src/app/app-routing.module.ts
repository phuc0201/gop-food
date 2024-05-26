import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

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
  exports: [RouterModule]
})
export class AppRoutingModule { }
