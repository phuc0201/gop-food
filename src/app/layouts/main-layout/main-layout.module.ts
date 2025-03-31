import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AuthComponent } from 'src/app/shared/component-shared/auth/auth.component';
import { BottomNavbarComponent } from '../layout-components/bottom-navbar/bottom-navbar.component';
import { MainFooterComponent } from '../layout-components/main-footer/main-footer.component';
import { MainHeaderComponent } from '../layout-components/main-header/main-header.component';
import { MobileHeaderComponent } from '../layout-components/mobile-header/mobile-header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
const plugins = [
  MainHeaderComponent,
  MainFooterComponent,
  BottomNavbarComponent,
  MobileHeaderComponent,
  AuthComponent
];
@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    plugins,
  ]
})
export class MainLayoutModule { }
