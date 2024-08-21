import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private restaurantSearchQueryCrr;
  restaurantSearchQuery: Observable<string>;

  constructor() {
    this.restaurantSearchQueryCrr = new BehaviorSubject<string>('');
    this.restaurantSearchQuery = this.restaurantSearchQueryCrr.asObservable();
  }

  setRestaurantSearchQuery(searchValue: string) {
    this.restaurantSearchQueryCrr.next(searchValue);
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
