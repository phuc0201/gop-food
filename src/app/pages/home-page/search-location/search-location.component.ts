import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchLocationComponent implements OnInit {
  langData: string = 'PAGES.HOME_PAGE.SEARCH_LOCATION.';
  listResult: string[] = [];
  control = new FormControl('');
  filteredAddress?: Observable<string[]>;
  inputValue?: string;
  filteredOptions: string[] = [];
  address = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
  search(): void {
    this.router.navigate(['/cuisines']);
  }

  onChange(value: string): void {
    this.filteredOptions = this.address.filter(adr => adr.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  ngOnInit(): void {

  }

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
    this.filteredOptions = this.address;
  }
}
