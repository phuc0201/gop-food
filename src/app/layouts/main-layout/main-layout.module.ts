import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { AuthComponent } from 'src/app/shared/component-shared/auth/auth.component';
import { DrawerCartComponent } from 'src/app/shared/component-shared/drawer-cart/drawer-cart.component';
import { PageLoaderComponent } from 'src/app/shared/component-shared/page-loader/page-loader.component';
import { ScrollDirective } from 'src/app/shared/widget/directives/scroll.directive';
import { BottomNavbarComponent } from './bottom-navbar/bottom-navbar.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const plugins = [
  DrawerCartComponent,
  PageLoaderComponent,
  AuthComponent
];
@NgModule({
  declarations: [
    MainHeaderComponent,
    MainFooterComponent,
    MainLayoutComponent,
    BottomNavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NzButtonModule,
    NzSelectModule,
    FormsModule,
    ScrollDirective,
    NzGridModule,
    plugins
  ]
})
export class MainLayoutModule { }
