import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { cuisineCategory } from 'src/assets/dummy-data/cuisine-category';

export interface ICuisineFilter {
  rate: number,
  promo: string,
  duration: number[],
  cuisines: string[];
}

@Component({
  selector: 'app-cuisine-category',
  templateUrl: './cuisine-category.component.html',
  styleUrls: ['./cuisine-category.component.scss']
})
export class CuisineCategoryComponent {
  listResult: string[] = [];
  openFilter: boolean = false;
  cuisineFilter: ICuisineFilter = {
    rate: 1,
    promo: '',
    duration: [10, 30],
    cuisines: []
  };
  cuisineCategory = cuisineCategory;

  constructor(private translate: TranslateService) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
  }
}
