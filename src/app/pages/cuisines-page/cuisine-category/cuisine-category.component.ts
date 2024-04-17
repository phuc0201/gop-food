import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CuisineCategory } from 'src/app/core/mock-data/cuisine-category.data';
@Component({
  selector: 'app-cuisine-category',
  templateUrl: './cuisine-category.component.html',
  styleUrls: ['./cuisine-category.component.scss']
})
export class CuisineCategoryComponent {
  listResult: string[] = [];
  openFilter: boolean = false;
  cuisineCategory = CuisineCategory;

  constructor(private translate: TranslateService) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
  }
}
