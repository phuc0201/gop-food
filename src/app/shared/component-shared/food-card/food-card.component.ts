import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FoodDetailsComponent } from '../food-details/food-details.component';

const plugins = [
  CommonModule,
  FoodDetailsComponent
];
@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
  standalone: true,
  imports: plugins
})
export class FoodCardComponent {
  showFoodDetails: boolean = false;
}
