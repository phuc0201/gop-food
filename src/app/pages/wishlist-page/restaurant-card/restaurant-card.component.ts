import { Component, Input } from '@angular/core';
import { Restaurant } from 'src/app/core/models/restaurant/restaurant.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent {
  @Input() restaurant = new Restaurant();
  removing: boolean = false;
  removeRestaurant(id: string) {
    this.removing = true;
    setTimeout(() => {
      this.removing = false;
      this.resSrv.removeItemInWishList(id);
    }, 1000);
  }
  constructor(
    private resSrv: RestaurantService
  ) { }
}
