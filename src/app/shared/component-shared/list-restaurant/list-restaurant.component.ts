import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { IPagedResults } from 'src/app/core/models/common/response-data.model';
import { RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
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
  currPage: number = 1;
  crrCateID: string = '';
  isLoading: boolean = true;
  restaurants: IPagedResults<RestaurantRecommended> = {
    data: [],
    totalPage: 0
  };
  restaurantsForSearch: IPagedResults<RestaurantRecommended> = {
    data: [],
    totalPage: 0
  };
  timeout: any;

  loadListOfRestaurants(): void {
    this.route.params.pipe(
      map(params => params["id"]),
      tap(() => { this.isLoading = true; }),
      switchMap(id => {
        this.crrCateID = id;
        this.store.dispatch(getRestaurantList({
          categoryId: this.crrCateID,
          searchQuery: "",
          page: this.currPage,
          limit: 10
        }));

        return this.store.select(selectRestaurantList).pipe(
          takeUntil(this.destroy$)
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: res => {
        this.restaurants.data = res.result.data;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.isLoading = false;
        }, 600);
      }
    });
  }

  observeSearchQuery(): void {
    this.searchSrc.restaurantSearchQuery.subscribe(searchValue => {
      this.store.dispatch(getRestaurantList({
        categoryId: this.crrCateID,
        searchQuery: searchValue,
        page: this.currPage,
        limit: 10
      }));
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
