import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRestaurantInfo } from 'src/app/core/models/common/response-data.model';
import { selectRestaurantInfo } from 'src/app/core/store/restaurant/restaurant.selectors';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.scss']
})
export class RestaurantInfoComponent implements OnInit {
  isLoading: boolean = true;
  isMobile: boolean = false;
  restaurantInfo: IRestaurantInfo = {
    _id: '',
    cuisine_categories: [],
    status: '',
    restaurant_name: '',
    bio: '',
    tier: '',
    location: {
      type: 'Point',
      coordinates: []
    },
    avatar: '',
    cover_image: '',
    distance: 0,
    duration: 0,
    rating: 0
  };

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    } else this.isMobile = false;
  }

  ngOnInit(): void {
    this.store.select(selectRestaurantInfo).subscribe(data => {
      if (data.error === '' && data.restaurant._id !== '') {
        this.restaurantInfo = data.restaurant;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    });
  }

  constructor(
    private store: Store
  ) {

  }
}
