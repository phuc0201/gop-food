import { Component, OnInit } from '@angular/core';
import { CuisineCategory } from 'src/app/core/models/cuisine/cuisine-category.model';
import { FoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { CuisineService } from 'src/app/core/services/cuisine.service';
import { SearchService } from 'src/app/core/services/search.service';

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

  search() {
    this.searchSrv.setRestaurantSearchQuery(this.searchValue);
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


  ngOnInit(): void {
    this.cuisineSrv.getCuisineCategories().subscribe(
      res => {
        this.categories = res;
        setTimeout(() => {
          this.isLoading = false;
        }, 600);
      }
    );

    const searchObserve$ = this.searchSrv.restaurantSearchQuery.subscribe({
      next: value => {
        this.searchValue = value;
      }
    });
    searchObserve$.unsubscribe();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }

  constructor(
    private searchSrv: SearchService,
    private cuisineSrv: CuisineService
  ) {
    this.search = this.debounce(this.search.bind(this), 500);
  }
}
