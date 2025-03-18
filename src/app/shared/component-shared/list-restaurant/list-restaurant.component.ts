import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { fromEvent, Subject, takeUntil, tap } from 'rxjs';
import { SortStatus } from 'src/app/core/models/common/enums/index.enum';
import { IPagedResults } from 'src/app/core/models/common/response-data.model';
import { ICuisineFilter } from 'src/app/core/models/restaurant/cuisine-filter.model';
import { RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { fetchRestaurants } from 'src/app/core/store/restaurant/restaurant.actions';
import { selectAllRestaurants } from 'src/app/core/store/restaurant/restaurant.selectors';
import { RestaurantCardComponent } from 'src/app/shared/component-shared/restaurant-card/restaurant-card.component';
import { DotSpinnerComponent } from '../loaders/dot-spinner/dot-spinner.component';

const plugin = [
  CommonModule,
  RestaurantCardComponent,
  NzGridModule,
  DotSpinnerComponent
];

@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.scss'],
  standalone: true,
  imports: plugin
})
export class ListRestaurantComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('listOfRestaurants', { static: true }) listOfRestaurantsEl!: ElementRef;

  @Input() columnConfig = {
    xs: 12,
    sm: 12,
    md: 8,
    lg: 6,
  };
  @Input() limit = 8;
  @Input() currCuisineId: string = '';
  @Input() filter!: ICuisineFilter;

  @Input() currSearchValue = '';
  @Input() restaurants: IPagedResults<RestaurantRecommended> = { currPage: 1, data: [], totalPage: -1 };
  observer!: IntersectionObserver;
  destroy$ = new Subject<void>();
  isObserveRoute = false;
  isLoading = true;
  isLoadMore = false;
  isFisrtLoading: boolean = true;
  isDataEmpty: boolean = false;
  scrollThreshold = 100;
  currPage: number = 0;
  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  ngAfterViewInit(): void {
    this.onMobileScroll();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
      return Array(4).fill(0);
    } else if (window.screen.width > 768) {
      return Array(3).fill(0);
    }

    return Array(4).fill(0);
  }

  loadRestaurants(): void {
    this.store.select(selectAllRestaurants)
      .pipe(
        tap(() => {
          this.isDataEmpty = false;
          if (!this.isLoadMore) {
            this.resetRestaurantsData();
          }
        })
      )
      .subscribe({
        next: (response) => {
          const isSameCuisine = response.restaurants.cuisineId === this.currCuisineId;

          if (!this.isLoadMore) {
            this.handleInitialLoad(response, isSameCuisine);
          } else {
            this.handleLoadMore(response);
          }
        }
      });
  }

  resetRestaurantsData(): void {
    this.isFisrtLoading = true;
    this.currPage = 0;
    this.restaurants = {
      currPage: 0,
      totalPage: 0,
      data: []
    };
  }

  handleInitialLoad(response: any, isSameCuisine: boolean): void {
    this.restaurants = isSameCuisine ? response.restaurants : { data: [], totalPage: 0, currPage: 0 };
    this.isDataEmpty = !response.loading && this.restaurants.totalPage === 0;

    if (this.isDataEmpty
      || (this.restaurants.currPage > 0 && this.restaurants.currPage === this.restaurants.totalPage)) {
      setTimeout(() => {
        document.getElementById('footer')?.classList.remove('hidden');
      }, this.restaurants.totalPage > 1 ? 500 : 0);
    }

    if (this.isDataEmpty || (this.restaurants.data.length > 0 && isSameCuisine)) {
      this.isFisrtLoading = false;
      this.isLoadMore = false;

      if (this.restaurants.data.length > 0 && isSameCuisine) {
        this.currPage = this.restaurants.currPage;
        if (this.restaurants.totalPage > 1 && this.restaurants.currPage < this.restaurants.totalPage) {
          document.getElementById('footer')?.classList.add('hidden');
        }
      }
    }
  }

  handleLoadMore(response: any): void {
    this.currPage = this.restaurants.currPage + 1;
    if (response.restaurants.totalPage > 0) {
      this.restaurants = response.restaurants;
      this.isLoadMore = false;
    }
  }

  loadMore(): void {
    const canLoadMore = this.restaurants.currPage < this.restaurants.totalPage
      && this.restaurants.currPage === this.currPage
      && !this.isLoadMore;

    if (canLoadMore) {
      this.currPage += 1;
      this.isLoadMore = true;
      this.store.dispatch(fetchRestaurants({
        cuisineId: this.currCuisineId,
        searchQuery: this.currSearchValue,
        page: this.currPage,
        limit: this.limit,
      }));
    }
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(): void {
    const restaurantsContainerBottom = this.listOfRestaurantsEl.nativeElement.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    if (!this.isLoadMore && (windowHeight - restaurantsContainerBottom > -this.scrollThreshold)) {
      this.loadMore();
    }
  }

  onMobileScroll(): void {
    const webbodyMobile = document.getElementById('webbody-mobile');

    if (webbodyMobile) {
      fromEvent(webbodyMobile, 'scroll')
        .pipe(takeUntil(this.destroy$))
        .subscribe((event: Event) => {
          if (window.innerWidth <= 768) {
            const restaurantsContainerBottom = this.listOfRestaurantsEl.nativeElement.getBoundingClientRect().bottom;
            const webbodyMobileBottom = webbodyMobile.getBoundingClientRect().bottom;
            if (!this.isLoadMore && (webbodyMobileBottom - restaurantsContainerBottom > -this.scrollThreshold)) {
              this.loadMore();
            }
          }
        });
    }
  }
}

