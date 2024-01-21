import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResponsiveDrawerDirective } from '../shared/widget/directives/responsive-drawer.directive';
import { ScrollDirective } from '../shared/widget/directives/scroll.directive';



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
