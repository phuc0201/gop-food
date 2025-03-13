import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { debounceTime, fromEvent, Subject, takeUntil, tap } from 'rxjs';
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
  @ViewChild('sentinel') sentinel!: ElementRef;
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

  restaurants: IPagedResults<RestaurantRecommended> = { currPage: 1, data: [], totalPage: -1 };
  observer!: IntersectionObserver;
  destroy$ = new Subject<void>();
  isObserveRoute = false;
  currSearchValue = '';
  crrCateID = '';
  isLoading = true;
  isLoadMore = false;
  isFisrtLoading: boolean = true;
  isDataEmpty: boolean = false;
  scrollThreshold = 100;

  constructor(
    private store: Store
  ) {
    this.loadRestaurants();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

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
            this.isFisrtLoading = true;
            this.restaurants = {
              currPage: 1,
              totalPage: 1,
              data: []
            };
          }
        }),
        debounceTime(this.isLoadMore ? 0 : 300)
      )
      .subscribe({
        next: (response) => {
          if (this.isFisrtLoading && response.restaurants.data.length === 0) {
            this.isDataEmpty = true;
          }
          else this.isDataEmpty = false;

          this.restaurants = response.restaurants;
          this.isFisrtLoading = false;
          this.isLoadMore = false;
        }
      });
  }

  loadMore(): void {
    if (this.restaurants.currPage < this.restaurants.totalPage) {
      this.isLoadMore = true;
      const currPage = this.restaurants.currPage;
      this.store.dispatch(fetchRestaurants({
        cuisineId: this.currCuisineId,
        searchQuery: this.currSearchValue,
        page: currPage + 1,
        limit: this.limit,
      }));
    }
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(): void {
    const restaurantsContainerBottom = this.listOfRestaurantsEl.nativeElement.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    if ((windowHeight - restaurantsContainerBottom > -this.scrollThreshold)) {
      this.loadMore();
    }
  }

  onMobileScroll(): void {
    const webbodyMobile = document.getElementById('webbodyMobile');
    if (webbodyMobile) {
      fromEvent(webbodyMobile, 'scroll')
        .pipe(takeUntil(this.destroy$))
        .subscribe((event: Event) => {
          const element = event.target as HTMLDivElement;
        });
    }
  }
}

