import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { combineLatest, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { SortStatus } from 'src/app/core/models/common/enums/index.enum';
import { IPagedResults } from 'src/app/core/models/common/response-data.model';
import { ICuisineFilter } from 'src/app/core/models/restaurant/cuisine-filter.model';
import { RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { SearchService } from 'src/app/core/services/search.service';
import { getRestaurantList } from 'src/app/core/store/restaurant/restaurant.action';
import { RestaurantCardComponent } from 'src/app/shared/component-shared/restaurant-card/restaurant-card.component';

const plugin = [
  CommonModule,
  RestaurantCardComponent,
  NzGridModule,
];

@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.scss'],
  standalone: true,
  imports: plugin
})
export class ListRestaurantComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  @Input() restaurants: IPagedResults<RestaurantRecommended> = { currPage: 1, data: [], totalPage: -1 };
  @Output() restaurantsChange = new EventEmitter<IPagedResults<RestaurantRecommended>>();
  @ViewChild('sentinel', { static: false }) sentinel!: ElementRef;
  private observer!: IntersectionObserver;
  private destroy$ = new Subject<void>();
  @Input() columnConfig = {
    xs: 12,
    sm: 12,
    md: 8,
    lg: 6,
  };

  isObserveRoute = false;
  currPage = 1;
  currSearchValue = '';
  crrCateID = '';
  isLoading = true;
  isNoData = false;
  @Input() limit = 8;

  filter!: ICuisineFilter;

  constructor(
    private route: ActivatedRoute,
    private searchSrc: SearchService,
    private restaurantSrv: RestaurantService,
    private store: Store
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurants'] && changes['restaurants'].currentValue) {
      if (this.restaurants.totalPage === 0) {
        this.isObserveRoute = false;
      }
      else if (this.restaurants.totalPage > 0) {
        this.isLoading = false;
        this.currPage = this.restaurants.currPage;
      }
    }
  }

  ngOnInit(): void {
    if (this.restaurants.totalPage === -1) {
      this.observeRoute();
      this.isObserveRoute = true;
    }
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.observer && this.sentinel) {
      this.observer.unobserve(this.sentinel.nativeElement);
    }
  }

  resetFilter(): void {
    this.filter = {
      sortby: SortStatus.RECOMMENDED,
      promo: false,
      bestOverall: false,
    };
  }

  @HostListener('window:resize', ['$event'])
  getListOfRestaurantsSkeleteon(): number[] {
    if (window.screen.width > 992) {
      return Array(8).fill(0);
    } else if (window.screen.width > 768) {
      return Array(6).fill(0);
    }

    return Array(4).fill(0);
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadMoreData();
        }
      });
    });

    if (this.sentinel) {
      this.observer.observe(this.sentinel.nativeElement);
    }
  }

  loadMoreData(): void {
    if (this.restaurants.currPage < this.restaurants.totalPage) {
      this.currPage += 1;
      if (!this.isObserveRoute) {
        this.isLoading = true;
        this.store.dispatch(getRestaurantList({
          categoryId: this.crrCateID,
          searchQuery: this.currSearchValue,
          page: this.currPage,
          limit: this.limit,
        }));
      }
      else {
        this.loadListOfRestaurants();
      }
    }
  }

  observeRoute(): void {
    this.route.queryParams
      .pipe(tap(() => {
        this.resetFilter();
        this.resetRestaurants();
      }))
      .subscribe({
        next: () => {
          this.handleQueryParams(this.route.snapshot.queryParams);
        },
        error: err => this.handleError(err),
      });
  }

  loadListOfRestaurants(): void {
    combineLatest([
      this.route.params.pipe(map(params => params["id"])),
      this.searchSrc.restaurantSearchQuery
    ]).pipe(
      tap(([id, search]) => this.handleSearchParams(id, search)),
      switchMap(([id, search]) => this.restaurantSrv.getRestaurants(id, search, this.currPage, this.limit, this.filter)),
      takeUntil(this.destroy$)
    ).subscribe({
      next: res => this.handleRestaurantResponse(res),
      error: err => this.handleError(err)
    });
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

    this.loadListOfRestaurants();
  }

  private handleSearchParams(id: string, search: string): void {
    this.isLoading = true;
    this.isNoData = false;

    if (this.crrCateID !== id || this.currSearchValue !== search) {
      this.resetRestaurants();
    }

    this.crrCateID = id;
    this.currSearchValue = search;
  }

  private handleRestaurantResponse(res: IPagedResults<RestaurantRecommended>): void {
    const newData = res.data.filter(newItem => !this.restaurants.data.some(existingItem => existingItem._id === newItem._id));
    this.restaurants = { currPage: res.currPage, totalPage: res.totalPage, data: [...this.restaurants.data, ...newData] };
    this.isLoading = false;
    this.isNoData = this.restaurants.data.length === 0;
    this.restaurantsChange.emit(this.restaurants);
  }

  private handleError(err: any): void {
    this.isLoading = false;
    this.isNoData = true;
    console.error('Error loading restaurants', err);
  }

  private resetRestaurants(): void {
    this.restaurants = { data: [], totalPage: 0, currPage: 1 };
    this.currPage = 1;
  }
}
