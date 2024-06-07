import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BottomNavbarComponent } from '../layout-components/bottom-navbar/bottom-navbar.component';
import { MainFooterComponent } from '../layout-components/main-footer/main-footer.component';
import { MainHeaderComponent } from '../layout-components/main-header/main-header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
const plugins = [
  MainHeaderComponent,
  MainFooterComponent,
  BottomNavbarComponent
];
@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    plugins
  ]
})
export class MainLayoutModule { }
