import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CuisineCategory } from 'src/app/core/models/cuisine/cuisine-category.model';
import { CuisineService } from 'src/app/core/services/cuisine.service';
@Component({
  selector: 'app-cuisine-category',
  templateUrl: './cuisine-category.component.html',
  styleUrls: ['./cuisine-category.component.scss']
})
export class CuisineCategoryComponent implements OnInit {
  listResult: string[] = [];
  openFilter: boolean = false;
  cuisineCategory: CuisineCategory[] = [];

  ngOnInit(): void {
    this.cuisineSrc.getCuisineCategories().subscribe(
      res => {
        this.cuisineCategory = res;
      }
    );
  }

  constructor(
    private translate: TranslateService,
    private cuisineSrc: CuisineService
  ) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
  }
}
