import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { RestaurantsRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { getRestaurantList } from 'src/app/core/store/restaurant/restaurant.actions';
import { selectRestaurantList } from 'src/app/core/store/restaurant/restaurant.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  address: string = '';
  foodItems: FoodItems<string>[] = [];
  listFoodCol: number = 6;
  isLoading: boolean = true;
  restaurants = new RestaurantsRecommended();

  loadProfile(): void {
    this.geoSrv.currLocation.subscribe(res => this.address = res.address);
  }

  loadRecommendedRestaurants() {
    this.store.dispatch(getRestaurantList());
    this.store.select(selectRestaurantList)
      .pipe()
      .subscribe({
        next: data => {
          this.restaurants = data.restaurants;
          setTimeout(() => {
            this.isLoading = false;
          }, 1600);
          this.cdRef.markForCheck();
        },
      }
      );
  }

  loadFoodItems() {
    this.resSrv.getFoodItems(1, 100).subscribe(data => {
      this.foodItems = data.foodItems;
    });
  }


  loadData() {
    this.loadProfile();
    this.loadFoodItems();
    this.loadRecommendedRestaurants();
  }

  ngOnInit(): void {
    this.loadData();
  }

  constructor(
    private geoSrv: GeolocationService,
    private resSrv: RestaurantService,
    private store: Store,
    private cdRef: ChangeDetectorRef
  ) { }
}

