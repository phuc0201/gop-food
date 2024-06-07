import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BottomNavbarComponent } from '../layout-components/bottom-navbar/bottom-navbar.component';
import { HeaderStickyComponent } from '../layout-components/header-sticky/header-sticky.component';
import { MainFooterComponent } from '../layout-components/main-footer/main-footer.component';
import { HeaderStickyLayoutComponent } from './header-sticky-layout/header-sticky-layout.component';
const plugins = [
  HeaderStickyComponent,
  MainFooterComponent,
  BottomNavbarComponent
];

@NgModule({
  declarations: [
    HeaderStickyLayoutComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    plugins
  ]
})
export class HeaderStickyLayoutModule { }
