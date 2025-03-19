import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { fromEvent, Subject, takeUntil } from 'rxjs';
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
  @Input() columnConfig = {
    xs: 12,
    sm: 12,
    md: 8,
    lg: 6,
  };
  @Input() limit = 8;
  @Input() currCuisineId: string = '';
  @Input() filter!: ICuisineFilter;
  @Output() isLoadingChange = new EventEmitter();
  @Input() currSearchValue = '';

  restaurants$ = this.store.select(selectAllRestaurants);
  currRestaurants: IPagedResults<RestaurantRecommended> = { data: [], currPage: 0, totalPage: 0 };
  destroy$ = new Subject<void>();
  isObserveRoute = false;
  isLoadMore = false;
  scrollThreshold = 200;
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
    this.restaurants$.subscribe({
      next: (state) => {
        this.currPage = state.restaurants.currPage;
        this.isLoadMore = state.isLoadMore;
        this.currRestaurants = state.restaurants;
      }
    });
  }

  loadMore(): void {
    this.store.dispatch(fetchRestaurants({
      cuisineId: this.currCuisineId,
      searchQuery: this.currSearchValue,
      page: this.currPage + 1,
      limit: this.limit,
    }));
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(): void {
    const restaurantsContainer = document.getElementById('listOfRestaurants');
    const restaurantsContainerBottom = restaurantsContainer?.getBoundingClientRect().bottom || 0;
    const windowHeight = window.innerHeight;

    if (!this.isLoadMore
      && (windowHeight - restaurantsContainerBottom > -this.scrollThreshold)
      && this.currRestaurants.currPage < this.currRestaurants.totalPage) {
      this.loadMore();
    }
  }

  onMobileScroll(): void {
    const webbodyMobile = document.getElementById('webbody-mobile');
    const restaurantsContainer = document.getElementById('listOfRestaurants');
    if (webbodyMobile) {
      fromEvent(webbodyMobile, 'scroll')
        .pipe(takeUntil(this.destroy$))
        .subscribe((event: Event) => {
          if (window.innerWidth <= 768) {
            const restaurantsContainerBottom = restaurantsContainer?.getBoundingClientRect().bottom || 0;
            const webbodyMobileBottom = webbodyMobile.getBoundingClientRect().bottom;
            if (!this.isLoadMore
              && (webbodyMobileBottom - restaurantsContainerBottom > -this.scrollThreshold)
              && this.currRestaurants.currPage < this.currRestaurants.totalPage) {
              this.loadMore();
            }
          }
        });
    }
  }
}

