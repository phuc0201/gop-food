import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ICuisineFilter } from 'src/app/core/models/cuisine-filter.model';




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
  value2 = [20, 50];

  constructor(
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
    ;
  }

  get filterURL(): string {
    return this.router.url.split('?')[0];
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

  resetFilter(): void {
    this.filter = {
      sortBy: 'recommended',
      promo: false,
      deliveryFee: 'any',
      price: [0, 100]
    };
  }

  inform(): void {
    console.log('promo');

  }

  ngOnInit(): void {
    this.resetFilter();
    this.route.queryParams.subscribe(params => {
      if (params["sortby"])
        this.filter.sortBy = params["sortby"];

      if (params["deliveryFee"])
        this.filter.deliveryFee = params["deliveryFee"];

      if (params["price"]) {
        this.filter.price = params['price'].split('-').map((str: string) => Number(str));
      }

      if (params["promo"]) {
        this.filter.promo = JSON.parse(params['promo']);
      }
    });
  }
}
