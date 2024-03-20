import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-cuisine-filter',
  templateUrl: './cuisine-filter.component.html',
  styleUrls: ['./cuisine-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CuisineFilterComponent implements OnInit {
  langData: string = 'PAGES.HOME_PAGE.SEARCH_LOCATION.';
  originalUrl: string = '';
  currUrl: string = '';
  constructor(
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
    ;
  }

  applyFilter(filterName: string, filterValue: any) {
    const queryParams = { ...this.route.snapshot.queryParams };
    queryParams[filterName] = filterValue;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {

  }
}
