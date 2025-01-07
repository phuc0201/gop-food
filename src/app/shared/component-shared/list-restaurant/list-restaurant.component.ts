import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { combineLatest, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { IPagedResults } from 'src/app/core/models/common/response-data.model';
import { RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { SearchService } from 'src/app/core/services/search.service';
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
export class ListRestaurantComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sentinel', { static: false }) sentinel!: ElementRef;

  private destroy$ = new Subject<void>();
  @Input() columnConfig = {
    xs: 12,
    sm: 12,
    md: 8,
    lg: 6,
  };

  currPage: number = 1;
  currSearchValue: string = '';
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
  @Input() limit: number = 12;

  constructor(
    private route: ActivatedRoute,
    private searchSrc: SearchService,
    private restaurantSrv: RestaurantService
  ) { }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  @HostListener('window:resize', ['$event'])
  getListOfRestaurantsSkeleteon(): number[] {
    if (window.screen.width > 992) {
      return Array(24 / this.columnConfig.lg).fill(0);
    }
    else if (window.screen.width > 768) {
      return Array(24 / this.columnConfig.md).fill(0);
    }
    return Array(4).fill(0);
  }

  ngOnInit(): void {
    this.loadListOfRestaurants();
    this.route.data.subscribe(data => {
      if (data['columnConfig']) {
        this.columnConfig = data['columnConfig'];
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupIntersectionObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.isLoading) {
            this.loadMoreData();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (this.sentinel?.nativeElement) {
      observer.observe(this.sentinel.nativeElement);
    }
  }

  loadMoreData(): void {
    if (this.currPage < this.restaurants.totalPage) {
      this.currPage += 1;
      this.loadListOfRestaurants();
    }
  }

  loadListOfRestaurants(): void {
    combineLatest([
      this.route.params.pipe(map(params => params["id"])),
      this.searchSrc.restaurantSearchQuery
    ]).pipe(
      tap(([id, search]) => {
        this.isLoading = true;
        this.isNoData = false;

        if (this.crrCateID !== id) {
          this.restaurants = { data: [], totalPage: 0 };
          this.currPage = 1;
        }

        if (this.crrCateID == id && this.currSearchValue !== search) {
          this.restaurants = { data: [], totalPage: 0 };
          this.currPage = 1;
        }

        this.crrCateID = id;
        this.currSearchValue = search;
      }),
      switchMap(([id, search]) =>
        this.restaurantSrv.getRestaurants(
          this.crrCateID,
          search,
          this.currPage,
          this.limit
        )
      ),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (res: IPagedResults<RestaurantRecommended>) => {
        this.restaurants.data = [
          ...this.restaurants.data,
          ...res.data
        ];

        this.isLoading = false;
        this.isNoData = this.restaurants.data.length === 0;
        this.restaurants.totalPage = res.totalPage;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.isNoData = true;
        console.error('Error loading restaurants', err);
      }
    });
  }
}
