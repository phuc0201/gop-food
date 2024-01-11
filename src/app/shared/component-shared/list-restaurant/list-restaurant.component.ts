import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
const plugins = [
  CommonModule,
  RestaurantCardComponent,
  NzGridModule
];
@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.scss'],
  standalone: true,
  imports: plugins
})
export class ListRestaurantComponent {

}
