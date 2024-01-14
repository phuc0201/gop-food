import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})
export class SearchLocationComponent implements OnInit {
  langData: string = 'PAGES.HOME_PAGE.SEARCH_LOCATION.';
  listResult: string[] = [];
  control = new FormControl('');
  address: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredAddress?: Observable<string[]>;

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
