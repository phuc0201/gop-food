import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerComponent, NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { Observable } from 'rxjs';
import { cuisineCategory } from 'src/assets/dummy-data/cuisine-category';


export interface ICuisineFilter {
  rate: number,
  promo: string,
  duration: number[],
  cuisines: string[];
}

@Component({
  selector: 'app-cuisine-filter',
  templateUrl: './cuisine-filter.component.html',
  styleUrls: ['./cuisine-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CuisineFilterComponent implements OnInit {
  langData: string = 'PAGES.HOME_PAGE.SEARCH_LOCATION.';
  listResult: string[] = [];
  openFilter: boolean = false;
  drawerPlacement: NzDrawerPlacement = 'right';
  control = new FormControl('');
  filteredAddress?: Observable<string[]>;
  cuisineFilter: ICuisineFilter = {
    rate: 1,
    promo: '',
    duration: [10, 30],
    cuisines: []
  };
  cuisineCategory = cuisineCategory;
  @ViewChild('drawer') drawer!: NzDrawerComponent;

  inputValue?: string;
  options: string[] = [];

  constructor(private translate: TranslateService) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
  }

  ngOnInit(): void {

  }
}
