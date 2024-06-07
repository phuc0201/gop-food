import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from 'src/app/shared/component-shared/cart/cart.component';

const plugins = [
  CommonModule,
  CartComponent,
  RouterModule
]
@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss'],
  standalone: true,
  imports: plugins
})
export class BottomNavbarComponent {
  openDrawerCart: boolean = false;
  constructor() { }
}
