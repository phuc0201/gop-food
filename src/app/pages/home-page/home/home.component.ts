import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IPagedResults } from 'src/app/core/models/common/response-data.model';
import { FoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { SearchService } from 'src/app/core/services/search.service';
import { getRestaurantList } from 'src/app/core/store/restaurant/restaurant.action';
import { selectRestaurantList } from 'src/app/core/store/restaurant/restaurant.selector';

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
  restaurants: IPagedResults<RestaurantRecommended> = { data: [], totalPage: 0, currPage: 1 };
  isMobile: boolean = false;
  restaurantsSubscription: Subscription = new Subscription();
  limit = 12;

  constructor(
    private geoSrv: GeolocationService,
    private searchSrv: SearchService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.handleMobileScreen();
    this.searchSrv.setRestaurantSearchQuery('');
    this.loadData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.handleMobileScreen();
  }

  handleMobileScreen() {
    this.isMobile = window.innerWidth < 768;
  }

  loadProfile(): void {
    this.geoSrv.currLocation.subscribe(res => this.address = res.address);
  }

  loadRecommendedRestaurants() {
    this.restaurantsSubscription = this.store.select(selectRestaurantList).subscribe({
      next: res => {
        if (res.result.data.length > 0) {
          this.restaurants = res.result;
        }
      }
    });

    if (this.restaurants.data.length == 0) {
      this.restaurantsSubscription.unsubscribe();
      this.store.dispatch(getRestaurantList({
        categoryId: "",
        searchQuery: "",
        page: 1,
        limit: this.limit
      }));

      this.restaurantsSubscription = this.store.select(selectRestaurantList)
        .pipe()
        .subscribe({
          next: res => {
            this.restaurants = res.result;
          },
          complete: () => {
            this.restaurantsSubscription.unsubscribe();
          }
        }
        );
    }
  }

  loadData() {
    this.loadProfile();
    this.loadRecommendedRestaurants();
  }
}

