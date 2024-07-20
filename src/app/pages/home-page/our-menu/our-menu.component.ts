import { Component, Input } from '@angular/core';
import { FoodItems } from 'src/app/core/models/restaurant/food-items.model';

@Component({
  selector: 'app-our-menu',
  templateUrl: './our-menu.component.html',
  styleUrls: ['./our-menu.component.scss']
})
export class OurMenuComponent {
  @Input() foodItems: FoodItems<string>[] = [];
}
