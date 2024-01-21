import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerComponent, NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { Observable, map, startWith } from 'rxjs';

export interface ICuisineFilter {
  rate: number,
  promo: string,
  duration: number[],
  cuisines: string[];
}

@Component({
  selector: 'app-cuisine-filter',
  templateUrl: './cuisine-filter.component.html',
  styleUrls: ['./cuisine-filter.component.scss']
})
export class CuisineFilterComponent implements OnInit {
  langData: string = 'PAGES.HOME_PAGE.SEARCH_LOCATION.';
  listResult: string[] = [];
  openFilter: boolean = false;
  drawerPlacement: NzDrawerPlacement = 'right';
  control = new FormControl('');
  address: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredAddress?: Observable<string[]>;
  cuisineFilter: ICuisineFilter = {
    rate: 1,
    promo: '',
    duration: [10, 30],
    cuisines: []
  };
  @ViewChild('drawer') drawer!: NzDrawerComponent;

  search(value: string): void {
    console.log('search: ' + value);

  }

  _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.address.filter(addr => this._normalizeValue(addr).includes(filterValue));
  }

  _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  openDrawer(): void {
    if (window.innerWidth < 768) {
      this.drawerPlacement = 'bottom';
    }
    else this.drawerPlacement = 'right';
    this.openFilter = true;
  }

  closeDrawer(): void {
    this.openFilter = false,
      console.log(this.cuisineFilter);
  }

  ngOnInit(): void {
    this.filteredAddress = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  constructor(private translate: TranslateService) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
  }
}
