import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ICuisineFilter } from 'src/app/core/models/restaurant/cuisine-filter.model';
import { FoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { FilterService } from 'src/app/core/services/filter.service';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { FooditemCardComponent } from '../fooditem-card/fooditem-card.component';

const plugins = [
  CommonModule,
  NzGridModule,
  FormsModule,
  FooditemCardComponent,
  NzPaginationModule
];

@Component({
  selector: 'app-list-fooditems',
  templateUrl: './list-fooditems.component.html',
  styleUrls: ['./list-fooditems.component.scss'],
  standalone: true,
  imports: plugins
})
export class ListFooditemsComponent implements OnInit {
  @Input() foodItems: FoodItems<string>[] = [];
  @Input() listFoodCol: number = 8;
  foodForSearch: FoodItems<string>[] = [];
  cate_id: string = '';
  filter: ICuisineFilter = {
    sortby: '',
    promo: false,
    under: 1800,
    bestOverall: false,
    price: [0, 100]
  };

  isLoading: boolean = false;
  searchValue: string = '';
  currPage: number = 1;
  limit: number = 10;
  currListOfFood: FoodItems<string>[] = [];
  totalPage: number = 0;



  search(name: string) {
    this.foodForSearch = this.foodItems.filter(food =>
      this.normalizeString(food.name.toLowerCase()).includes(this.normalizeString(name.toLowerCase()))
    );
  }

  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  debounce(func: Function, wait: number) {
    let timeout: any;
    return (...args: any[]) => {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  reloadFoodItems() {
    this.isLoading = true;
    this.resSrv.getFoodItems(this.currPage, this.limit * 10, this.cate_id).subscribe({
      next: data => {
        this.foodItems = data.foodItems;
        this.foodForSearch = data.foodItems;
        this.totalPage = data.totalPage;
      },
      complete: () => {
        setTimeout(() => { this.isLoading = false; }, 500);
      }
    });
  }



  ngOnInit(): void {
    this.filterSrv.filter$.subscribe(data => {
      this.searchValue = data.searchValue;
      this.search(data.searchValue);
    });
  }

  constructor(
    private route: ActivatedRoute,
    private resSrv: RestaurantService,
    private filterSrv: FilterService
  ) {
    this.search = this.debounce(this.search.bind(this), 500);
    this.route.params.subscribe(params => {
      this.cate_id = params["cate_id"];
      this.reloadFoodItems();
    });
  }
}
