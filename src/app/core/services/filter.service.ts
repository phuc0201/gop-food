import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export class Filter {
  minPrice: number = 0;
  maxPrice: number = 0;
  prices: [number, number] = [0, 0];
  searchValue: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterSubject = new BehaviorSubject<Filter>(new Filter());
  filter$ = this.filterSubject.asObservable();

  updateFilter(newFilter: Filter) {
    this.filterSubject.next(newFilter);
  }

  constructor() {

  }
}
