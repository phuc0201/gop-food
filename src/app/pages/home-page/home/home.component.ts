import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { URLConstant } from 'src/app/core/constants/url.constant';
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
  limit = 32;
  isHiddenSystemService: boolean = true;
  currPage = 1;
  diningMode = DiningMode.DELIVERY;

  constructor(
    private geoSrv: GeolocationService,
    private searchSrv: SearchService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.handleMobileScreen();
    this.searchSrv.setRestaurantSearchQuery('');
    this.route.queryParams
      .pipe(
        filter(() => this.router.url.startsWith(URLConstant.ROUTE.HOMEPAGE))
      )
      .subscribe({
        next: (params) => {
          if (params['diningMode'] == DiningMode.PICKUP) {
            this.toggleNearbyRestaurantsOnMap();
          }
          else {
            this.loadRestaurants();
          }
        }
      });
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
    this.restaurants = { data: [], totalPage: 0, currPage: 0 };

    this.store.dispatch(fetchRestaurants({
      cuisineSlug: "",
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

  toggleNearbyRestaurantsOnMap(openMap: boolean = true) {
    if (window.innerWidth <= 768) {
      const webbodyMobile = document.getElementById('webbody-mobile');
      webbodyMobile?.scroll({
        top: 0,
        behavior: 'instant'
      });
    }
    this.displayNearbyRestaurantsOnMap = openMap;

    if (this.displayNearbyRestaurantsOnMap) {
      this.router.navigate(['/feed'], {
        queryParams: { diningMode: DiningMode.PICKUP },
      });
    }
    else {
      this.router.navigate(['/feed'], {
        queryParams: { diningMode: DiningMode.DELIVERY },
      });
    }
  }
}

