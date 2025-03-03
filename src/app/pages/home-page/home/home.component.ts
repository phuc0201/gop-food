import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class HomeComponent implements OnInit, OnDestroy {
  address: string = '';
  foodItems: FoodItems<string>[] = [];
  listFoodCol: number = 6;
  isLoading: boolean = false;
  restaurants: IPagedResults<RestaurantRecommended> = { data: [], totalPage: 0, currPage: 1 };
  isMobile: boolean = false;
  restaurantsSubscription: Subscription = new Subscription();
  limit = 8;
  isHiddenSystemService: boolean = true;

  constructor(
    private geoSrv: GeolocationService,
    private searchSrv: SearchService,
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.handleMobileScreen();
    this.searchSrv.setRestaurantSearchQuery('');
    this.loadData();
    document.getElementById('footer')?.classList.add('hidden');
  }

  ngOnDestroy(): void {
    document.getElementById('footer')?.classList.remove('hidden');
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
          this.isLoading = false;
          if (res.result.currPage === res.result.totalPage) {
            document.getElementById('footer')?.classList.remove('hidden');
            this.isHiddenSystemService = false;
          }
        }
        else this.isLoading = true;
      },
      complete: () => {
        this.restaurantsSubscription.unsubscribe();
      }
    });

    if (this.isLoading = true) {
      this.store.dispatch(getRestaurantList({
        categoryId: "",
        searchQuery: "",
        page: 1,
        limit: this.limit
      }));
    }
  }

  loadData() {
    this.loadRecommendedRestaurants();
  }
}

