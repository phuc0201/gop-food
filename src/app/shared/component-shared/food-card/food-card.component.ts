import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

const plugins = [
  CommonModule,
]
@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
  standalone: true,
  imports: plugins
})
export class FoodCardComponent {

}
