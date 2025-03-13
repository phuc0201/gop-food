import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { DiningMode } from 'src/app/core/models/common/enums/index.enum';
import { IPagedResults } from 'src/app/core/models/common/response-data.model';
import { FoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { SearchService } from 'src/app/core/services/search.service';
import { fetchRestaurants } from 'src/app/core/store/restaurant/restaurant.actions';
import { selectAllRestaurants } from 'src/app/core/store/restaurant/restaurant.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  displayNearbyRestaurantsOnMap: boolean = false;
  address: string = '';
  foodItems: FoodItems<string>[] = [];
  listFoodCol: number = 6;
  isLoading: boolean = false;
  restaurants: IPagedResults<RestaurantRecommended> = { data: [], totalPage: 0, currPage: 1 };
  isMobile: boolean = false;
  restaurantsSubscription: Subscription = new Subscription();
  limit = 30;
  isHiddenSystemService: boolean = true;
  currPage = 1;
  diningMode = DiningMode.DELIVERY;

  constructor(
    private geoSrv: GeolocationService,
    private searchSrv: SearchService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.handleMobileScreen();
    this.searchSrv.setRestaurantSearchQuery('');
    this.getDiningMode();
  }

  ngAfterViewInit(): void {
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

  loadRestaurants() {
    this.store.dispatch(fetchRestaurants({
      cuisineId: "",
      searchQuery: "",
      page: this.currPage,
      limit: this.limit
    }));

    this.store.select(selectAllRestaurants).subscribe({
      next: res => {
        if (res.restaurants.currPage === res.restaurants.totalPage) {
          setTimeout(() => {
            document.getElementById('footer')?.classList.remove('hidden');
            this.isHiddenSystemService = false;
          }, 200);
        }
      }
    });
  }

  toggleNearbyRestaurantsOnMap() {
    if (window.innerWidth <= 768) {
      const webbodyMobile = document.getElementById('webbody-mobile');
      webbodyMobile?.scroll({
        top: 0,
        behavior: 'instant'
      });
    }

    setTimeout(() => {
      this.displayNearbyRestaurantsOnMap = !this.displayNearbyRestaurantsOnMap;

      const header = document.getElementById('header');
      if (this.displayNearbyRestaurantsOnMap) {
        this.setDiningMode(DiningMode.PICKUP);
        header?.classList.add('header-sticky');
      }
      else {
        this.loadRestaurants();
        header?.classList.remove('header-sticky');
        this.setDiningMode(DiningMode.DELIVERY);
      }
    }, window.innerWidth <= 768 ? 100 : 0);
  }

  getDiningMode() {
    const diningMode = localStorage.getItem(SystemConstant.DINING_MODE);
    if (diningMode && diningMode === DiningMode.PICKUP) {
      this.displayNearbyRestaurantsOnMap = true;
      this.setDiningMode(DiningMode.PICKUP);
      this.diningMode = DiningMode.PICKUP;
    }
    else {
      this.loadRestaurants();
      this.setDiningMode(DiningMode.DELIVERY);
    }
  }

  setDiningMode(mode: DiningMode) {
    this.diningMode = mode;
    localStorage.setItem(SystemConstant.DINING_MODE, mode);
  }
}

