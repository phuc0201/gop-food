import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SortStatus } from 'src/app/core/models/common/enums/index.enum';
import { IPagedResults } from 'src/app/core/models/common/response-data.model';
import { CuisineCategory } from 'src/app/core/models/cuisine/cuisine-category.model';
import { ICuisineFilter } from 'src/app/core/models/restaurant/cuisine-filter.model';
import { FoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { SearchService } from 'src/app/core/services/search.service';
import { fetchRestaurants } from 'src/app/core/store/restaurant/restaurant.actions';

@Component({
  selector: 'app-cuisines',
  templateUrl: './cuisines.component.html',
  styleUrls: ['./cuisines.component.scss']
})
export class CuisinesComponent implements OnInit {
  foodItems: FoodItems<string>[] = [];
  foodForSearch: FoodItems<string>[] = [];
  cate_id: string = '';
  isLoading: boolean = true;
  categories: CuisineCategory[] = [];
  searchValue: string = '';
  prices: [number, number] = [20, 100];
  minPrice: number = 0;
  maxPrice: number = 100;
  filter!: ICuisineFilter;
  restaurantsSubscription: Subscription = new Subscription();
  restaurants: IPagedResults<RestaurantRecommended> = { data: [], totalPage: 0, currPage: 1 };
  currPage: number = 1;
  limit: number = 12;
  currCuisineId: string = '';

  constructor(
    private searchSrv: SearchService,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.search = this.debounce(this.search.bind(this), 500);
    this.route.queryParams.subscribe({
      next: () => {
        this.handleQueryParams(this.route.snapshot.queryParams);
      },
    });

    this.route.paramMap.subscribe(params => {
      this.currCuisineId = params.get('id')!;
      this.restaurants = { data: [], totalPage: 0, currPage: 1 };
      this.loadRestaurants(this.currCuisineId);
    });
  }

  ngOnInit(): void {
    const searchObserve$ = this.searchSrv.restaurantSearchQuery.subscribe({
      next: value => {
        this.searchValue = value;
      }
    });
    searchObserve$.unsubscribe();
  }

  loadRestaurants(cuisineId: string) {
    this.store.dispatch(fetchRestaurants({
      cuisineId: cuisineId,
      searchQuery: "",
      page: this.currPage,
      limit: this.limit,
      filter: this.filter
    }));
  }

  private handleQueryParams(params: any): void {
    const { sortby, promo, under, bestOverall, deliveryFee } = params;

    this.filter = {
      sortby: sortby || SortStatus.RECOMMENDED,
      promo: promo === 'true' || false,
      bestOverall: bestOverall === 'true' || false,
      deliveryFee: deliveryFee || 'any'
    };
    if (under) {
      this.filter.under = Number(under);
    }

    this.loadRestaurants(this.currCuisineId);
  }

  search(searchValue: string) {
    this.searchSrv.setRestaurantSearchQuery(searchValue);
  }

  normalizeString(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  debounce(func: Function, wait: number) {
    let timeout: any;
    return (...args: any[]) => {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}
