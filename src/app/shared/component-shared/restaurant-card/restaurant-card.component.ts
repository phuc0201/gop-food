import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

const plugins = [
  CommonModule
];
@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss'],
  standalone: true,
  imports: plugins
})
export class RestaurantCardComponent {

}
