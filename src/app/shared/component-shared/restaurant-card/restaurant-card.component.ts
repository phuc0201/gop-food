import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CuisineCategory } from 'src/app/core/mock-data/cuisine-category.data';
import { IRestaurant } from 'src/app/core/models/common/response-data.model';

const plugins = [
  CommonModule,
  RouterModule,
];
@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss'],
  standalone: true,
  imports: plugins
})
export class RestaurantCardComponent implements OnChanges, OnInit {
  @Input() restaurant: IRestaurant = {
    _id: '',
    restaurant_name: 'Loading....',
    cuisine_categories: [],
    restaurant_categories: [],
    status: '',
    bio: '',
    address: '',
    location: {
      type: 'Point',
      coordinates: []
    },
    avatar: '',
    cover_image: '',
    distance: 0,
    duration: 0
  };;
  @Input() isLoading: boolean = true;
  isLoadImg: boolean = true;
  isHome: boolean = false;
  cuisine_cate_name: string[] = ['Loading....'];
  distance: number = 0;
  duration: number = 0;

  getCuisineNameByType() {
    this.cuisine_cate_name = [];
    this.restaurant.cuisine_categories.forEach(type => {
      const cuisine = CuisineCategory.find(item => item.type == type);
      if (cuisine) {
        this.cuisine_cate_name.push(cuisine.name);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurant']) {
      this.restaurant = changes['restaurant'].currentValue;
      this.getCuisineNameByType();
      this.distance = parseFloat((this.restaurant.distance / 1000).toFixed(2));
      this.duration = parseFloat((this.restaurant.duration / 6000).toFixed(0));
    }
  }

  ngOnInit(): void {

  }


  constructor(
    private route: Router
  ) {
    this.isHome = this.route.url == '/' ? true : false;
  }

}
