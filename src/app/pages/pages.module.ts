import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { MainLayoutModule } from '../layouts/main-layout/main-layout.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MainLayoutModule
  ]
})
export class PagesModule { }
