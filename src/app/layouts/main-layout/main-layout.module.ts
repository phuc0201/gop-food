import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { DrawerComponent } from 'src/app/shared/component-shared/drawer/drawer.component';
import { ScrollDirective } from 'src/app/core/directives/scroll.directive';
import { NzGridModule } from 'ng-zorro-antd/grid';

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
    DrawerComponent,
    ScrollDirective,
    NzGridModule
  ]
})
export class MainLayoutModule { }
