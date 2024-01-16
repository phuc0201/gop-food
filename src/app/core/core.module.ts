import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResponsiveDrawerDirective } from './directives/responsive-drawer.directive';
import { ScrollDirective } from './directives/scroll.directive';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ScrollDirective,
    ResponsiveDrawerDirective
  ]
})
export class CoreModule { }
