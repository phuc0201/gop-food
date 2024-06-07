import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderStickyLayoutModule } from '../layouts/header-sticky-layout/header-sticky-layout.module';
import { MainLayoutModule } from '../layouts/main-layout/main-layout.module';
import { PagesRoutingModule } from './pages-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MainLayoutModule,
    HeaderStickyLayoutModule
  ]
})
export class PagesModule { }
