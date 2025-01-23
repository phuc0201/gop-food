import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MainLayoutModule } from '../layouts/main-layout/main-layout.module';
import { PagesRoutingModule } from './pages-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MainLayoutModule
  ]
})
export class PagesModule { }
