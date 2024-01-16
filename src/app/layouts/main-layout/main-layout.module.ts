import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ScrollDirective } from 'src/app/core/directives/scroll.directive';
import { DrawerCartComponent } from 'src/app/shared/component-shared/drawer-cart/drawer-cart.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [
    MainHeaderComponent,
    MainFooterComponent,
    MainLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NzButtonModule,
    NzSelectModule,
    FormsModule,
    DrawerCartComponent,
    ScrollDirective,
    NzGridModule
  ]
})
export class MainLayoutModule { }
