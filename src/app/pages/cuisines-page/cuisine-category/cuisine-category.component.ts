import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { cuisineCategory } from 'src/assets/dummy-data/cuisine-category';
@Component({
  selector: 'app-cuisine-category',
  templateUrl: './cuisine-category.component.html',
  styleUrls: ['./cuisine-category.component.scss']
})
export class CuisineCategoryComponent {
  listResult: string[] = [];
  openFilter: boolean = false;
  cuisineCategory = cuisineCategory;

  constructor(private translate: TranslateService) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
  }
}
