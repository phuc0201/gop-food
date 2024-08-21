import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuisineCategory } from 'src/app/core/mock-data/cuisine-category.data';
import { FoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { Category } from 'src/app/core/models/restaurant/restaurant-category.model';
import { Filter } from 'src/app/core/services/filter.service';
import { SearchService } from 'src/app/core/services/search.service';

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
  categories: Category[] = CuisineCategory;
  searchValue: string = '';
  prices: [number, number] = [20, 100];
  minPrice: number = 0;
  maxPrice: number = 100;

  search(name: string) {
    this.searchSrc.setRestaurantSearchQuery(name);
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

  reloadFoodItems() {
    this.isLoading = true;
  }

  filterByPrice(event: [number, number]) {
    const filter = new Filter();
    filter.minPrice = this.minPrice;
    filter.maxPrice = this.maxPrice;
    filter.searchValue = this.searchValue;
    filter.prices = event;
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
  }

  constructor(
    private router: Router,
    private searchSrc: SearchService
  ) {
    this.search = this.debounce(this.search.bind(this), 500);
  }
}
