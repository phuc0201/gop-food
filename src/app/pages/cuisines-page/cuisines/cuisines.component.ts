import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { SortStatus } from 'src/app/core/models/common/enums/index.enum';
import { CuisineCategory } from 'src/app/core/models/cuisine/cuisine-category.model';
import { ICuisineFilter } from 'src/app/core/models/restaurant/cuisine-filter.model';
import { FoodItems } from 'src/app/core/models/restaurant/food-items.model';
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
  currPage: number = 1;
  limit: number = 20;
  currCuisineSlug: string = '';

  constructor(
    private searchSrv: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.searchSrv.restaurantSearchQuery,
      this.route.queryParams,
      this.route.paramMap,
    ])
      .subscribe(([searchValue, queryParams, paramMap]) => {
        this.currCuisineSlug = paramMap.get('slug') ?? '';
        if (!this.router.url.startsWith(URLConstant.ROUTE.HOMEPAGE)) {
          this.handleQueryParams(queryParams);
          this.loadRestaurants(searchValue);
        }
      });
  }

  loadRestaurants(searchValue: string = '') {
    this.store.dispatch(fetchRestaurants({
      cuisineSlug: this.currCuisineSlug,
      searchQuery: searchValue,
      page: this.currPage,
      limit: this.limit,
      filter: this.filter
    }));
  }

  handleQueryParams(params: any): void {
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
