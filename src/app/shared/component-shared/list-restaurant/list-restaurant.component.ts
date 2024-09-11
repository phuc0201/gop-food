import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { IPagedResults } from 'src/app/core/models/common/response-data.model';
import { RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { SearchService } from 'src/app/core/services/search.service';
import { getRestaurantList } from 'src/app/core/store/restaurant/restaurant.actions';
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
  isNoData: boolean = false;
  restaurantsForSearch: IPagedResults<RestaurantRecommended> = {
    data: [],
    totalPage: 0
  };
  timeout: any;

  loadListOfRestaurants(): void {
    this.route.params.pipe(
      map(params => params["id"]),
      tap(() => { this.isLoading = true; this.isNoData = false; }),
      switchMap(id => {
        this.crrCateID = id;
        return this.restaurantSrv.getRestaurants(
          this.crrCateID,
          "",
          this.currPage,
          10
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: res => {
        this.restaurants.data = res.data;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.isLoading = false;
          this.isNoData = this.restaurants.data.length === 0;
        }, 600);
      },
      complete: () => {

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
    private searchSrc: SearchService,
    private restaurantSrv: RestaurantService
  ) { }

}
