import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { ICuisineFilter } from 'src/app/core/models/restaurant/cuisine-filter.model';



@Component({
  selector: 'app-cuisine-filter',
  templateUrl: './cuisine-filter.component.html',
  styleUrls: ['./cuisine-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CuisineFilterComponent implements OnInit {
  langData: string = 'PAGES.HOME_PAGE.SEARCH_LOCATION.';
  dropDownForSortBy: boolean = false;
  dropDownForDeleivery: boolean = false;
  dropDownForPrice: boolean = false;
  filter!: ICuisineFilter;
  visibleFilterDrawer: boolean = false;
  isMobileScreen: boolean = false;
  loaderApplyFilter: boolean = false;
  priceMax: number = 250000;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  get filterURL(): string {
    return this.router.url.split('?')[0];
  }

  checkScreenWidth() {
    this.isMobileScreen = window.innerWidth <= 576;
    if (!this.isMobileScreen) {
      this.visibleFilterDrawer = false;
    }
    else {
      this.dropDownForSortBy = false;
      this.dropDownForDeleivery = false;
      this.dropDownForPrice = false;
    }
  }

  applyFilter(filterName: string, filterValue: any): void {
    const queryParams = { ...this.route.snapshot.queryParams };
    queryParams[filterName] = filterValue;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
    this.dropDownForPrice = false;
  }

  applyFilterMobile(): void {
    this.loaderApplyFilter = true;
    setTimeout(() => {
      this.loaderApplyFilter = false;
      let queryParams = { ...this.route.snapshot.queryParams };
      queryParams = { ...this.filter };
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      });
      this.closeFilterDrawer();
    }, 500);
  }

  resetFilter(): void {
    this.filter = {
      sortby: 'recommended',
      promo: false,
      under: null,
      bestOverall: false,
      deliveryFee: 'any'
    };
  }

  openFilterDrawer(): void {
    this.visibleFilterDrawer = true;
  }

  closeFilterDrawer(): void {
    this.visibleFilterDrawer = false;
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        tap(() => { this.resetFilter(); })).subscribe(params => {
          if (params["sortby"])
            this.filter.sortby = params["sortby"];

          if (params["under"]) {
            this.filter.under = Number(params["under"]);
          }

          if (params["bestOverall"]) {
            this.filter.bestOverall = JSON.parse(params["bestOverall"]);
          }

          if (params["deliveryFee"]) {
            this.filter.deliveryFee = params["deliveryFee"];
          }

          if (params["promo"]) {
            this.filter.promo = JSON.parse(params['promo']);
          }
        });
  }

  constructor(
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
    this.checkScreenWidth();
  }
}
