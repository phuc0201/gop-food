import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { filter } from 'rxjs';
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

  slug: string = '';
  isLoading: boolean = true;
  reataurants = new RestaurantsRecommended();


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params["slug"];
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });
    this.route.queryParams.subscribe(params => {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });
    this.store.dispatch(getRestaurantList());
    const resSeletor = this.store.select(selectRestaurantList)
      .pipe(
        filter(res => res.restaurants.count != 0)
      )
      .subscribe({
        next: res => this.reataurants = res.restaurants,
        complete: () => {
          this.isLoading = false;
          resSeletor.unsubscribe();
        }
      });
  }

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) { }
}
