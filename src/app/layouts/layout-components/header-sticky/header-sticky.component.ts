import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainHeaderComponent } from '../main-header/main-header.component';

const plugins = [
  CommonModule,
  MainHeaderComponent
]
@Component({
  selector: 'app-header-sticky',
  templateUrl: './header-sticky.component.html',
  styleUrls: ['./header-sticky.component.scss'],
  standalone: true,
  imports: plugins
})
export class HeaderStickyComponent {

}
