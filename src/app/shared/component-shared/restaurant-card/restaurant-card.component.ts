import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

const plugins = [
  CommonModule,
  RouterModule
];
@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss'],
  standalone: true,
  imports: plugins
})
export class RestaurantCardComponent {
  @Input() isloading!: boolean;
  isHome: boolean = false;
  constructor(
    private route: Router
  ) {
    this.isHome = this.route.url == '/' ? true : false;
  }
}
