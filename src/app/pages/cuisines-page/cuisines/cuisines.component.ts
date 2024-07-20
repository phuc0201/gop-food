import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuisineCategory } from 'src/app/core/mock-data/cuisine-category.data';
import { FoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { CategorySlider } from 'src/app/core/models/restaurant/restaurant-category.model';
import { Filter, FilterService } from 'src/app/core/services/filter.service';
import { RestaurantService } from 'src/app/core/services/restaurant.service';

@Component({
  selector: 'app-cuisines',
  templateUrl: './cuisines.component.html',
  styleUrls: ['./cuisines.component.scss']
})
export class CuisinesComponent implements OnInit {
  listCuisine = [...CuisineCategory];
  foodItems: FoodItems<string>[] = [];
  foodForSearch: FoodItems<string>[] = [];
  cate_id: string = '';
  isLoading: boolean = false;
  categories: CategorySlider[] = [];
  searchValue: string = '';
  prices: [number, number] = [20, 100];
  minPrice: number = 0;
  maxPrice: number = 100;
  search(name: string) {
    const filter = new Filter();
    filter.searchValue = name;
    this.filterSrv.updateFilter(filter);
  }

  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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

  reloadFoodItems() {
    this.isLoading = true;
  }

  ngOnInit(): void {
    let index = this.listCuisine.findIndex(item => this.router.url.includes(item.slug));
    if (index !== -1) {
      const cuisine = this.listCuisine.splice(index, 1)[0];
      this.listCuisine.unshift(cuisine);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    this.restaurantSrv.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  filterByPrice(event: [number, number]) {
    const filter = new Filter();
    filter.minPrice = this.minPrice;
    filter.maxPrice = this.maxPrice;
    filter.searchValue = this.searchValue;
    filter.prices = event;
  }

  constructor(
    private router: Router,
    private restaurantSrv: RestaurantService,
    private filterSrv: FilterService
  ) {
    this.filterSrv.filter$.subscribe(data => {
      this.minPrice = data.minPrice;
      this.maxPrice = data.maxPrice;
    });
  }

}
