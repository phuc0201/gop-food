import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { filter } from 'rxjs';
import { ICuisineFilter } from 'src/app/core/models/restaurant/cuisine-filter.model';
import { RestaurantsRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { getRestaurantList } from 'src/app/core/store/restaurant/restaurant.actions';
import { selectRestaurantList } from 'src/app/core/store/restaurant/restaurant.selectors';
import { RestaurantCardComponent } from 'src/app/shared/component-shared/restaurant-card/restaurant-card.component';

const plugin = [
  CommonModule,
  RestaurantCardComponent,
  NzGridModule
];
@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.scss'],
  standalone: true,
  imports: plugin
})
export class ListRestaurantComponent implements OnInit {
  filter: ICuisineFilter = {
    sortby: '',
    promo: false,
    deliveryFee: '',
    price: [0, 100]
  };
  slug: string = '';
  isLoading: boolean = true;
  restaurants = new RestaurantsRecommended();
  priceMax: number = 250000;

  reloadListRestaurant() {
    setTimeout(() => {
      this.isLoading = false;
    }, 700);
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.route.params.subscribe(params => {
      this.slug = params["slug"];
      this.isLoading = true;
      this.reloadListRestaurant();
    });

    this.route.queryParams.subscribe(params => {
      this.isLoading = true;
      console.log(this.filter);

      this.reloadListRestaurant();
    });

    this.store.dispatch(getRestaurantList());
    const resSeletor = this.store.select(selectRestaurantList)
      .pipe(
        filter(res => res.restaurants.count != 0)
      )
      .subscribe({
        next: res => this.restaurants = res.restaurants,
        complete: () => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          resSeletor.unsubscribe();
        }
      });

    this.route.queryParams.subscribe(params => {
      if (params["sortby"])
        this.filter.sortby = params["sortby"];

      if (params["deliveryFee"])
        this.filter.deliveryFee = params["deliveryFee"];

      if (params["price"]) {
        this.filter.price = params['price'].split('-').map((str: string) => Number(str));
      }

      if (params["promo"]) {
        this.filter.promo = JSON.parse(params['promo']);
      }
    });
  }

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) { }
}
