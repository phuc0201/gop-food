import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { filter, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { CuisineCategory } from 'src/app/core/mock-data/cuisine-category.data';
import { Restaurant, RestaurantsRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { SearchService } from 'src/app/core/services/search.service';
import { getRestaurantList } from 'src/app/core/store/restaurant/restaurant.actions';
import { selectRestaurantList } from 'src/app/core/store/restaurant/restaurant.selectors';
import { RestaurantCardComponent } from 'src/app/shared/component-shared/restaurant-card/restaurant-card.component';
import { NoResultsComponent } from '../no-results/no-results.component';

const plugin = [
  CommonModule,
  RestaurantCardComponent,
  NzGridModule,
  NoResultsComponent
];
@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.scss'],
  standalone: true,
  imports: plugin
})
export class ListRestaurantComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  slug: string = '';
  isLoading: boolean = false;
  restaurants = new RestaurantsRecommended();
  restaurantsForSearch: Restaurant[] = [];
  timeout: any;

  loadListOfRestaurants(): void {
    this.route.params.pipe(
      map(params => params["slug"]),
      tap(() => { this.isLoading = true; }),
      switchMap(slug => {
        this.slug = slug;

        this.store.dispatch(getRestaurantList());
        return this.store.select(selectRestaurantList).pipe(
          filter(res => res.restaurants.count !== 0),
          takeUntil(this.destroy$)
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: res => {
        clearTimeout(this.timeout);
        if (res.restaurants.count > 0) {

          if (this.slug !== undefined) {
            let categories = CuisineCategory.find(cate => cate.slug == this.slug);

            this.restaurants.items = res.restaurants.items.filter((item) => {
              if (this.slug == '' || item.cuisine_categories.includes(categories?.type ?? ''))
                return true;
              return false;
            });

            this.restaurants.count = this.restaurants.items.length;
          }
          else {
            this.restaurants = res.restaurants;
          }

          this.restaurantsForSearch = this.restaurants.items;

          this.timeout = setTimeout(() => {
            this.isLoading = false;
          }, 600);
        }
      }
    });
  }

  observeSearchQuery(): void {
    this.searchSrc.restaurantSearchQuery.subscribe(searchValue => {
      this.restaurantsForSearch = this.restaurants.items.filter(item => this.searchSrc.normalizeString(item.restaurant_name).includes(this.searchSrc.normalizeString(searchValue)));
    });
  }

  ngOnInit(): void {
    this.loadListOfRestaurants();
    this.observeSearchQuery();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private searchSrc: SearchService
  ) { }

}
