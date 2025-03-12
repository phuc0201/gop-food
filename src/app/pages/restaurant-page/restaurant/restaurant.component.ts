import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Restaurant, RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { getMenu, getRestaurantInfo } from 'src/app/core/store/restaurant/restaurant.action';
import { selectRestaurantInfo } from 'src/app/core/store/restaurant/restaurant.selector';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  isMobile: boolean = false;
  isLoading: boolean = false;
  restaurant = new Restaurant();
  isInWishlist: boolean = false;
  restaurantSubscription: Subscription = new Subscription();
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private restaurantSrv: RestaurantService,
  ) { }

  ngOnInit(): void {
    this.handleMobileScreen();
    const id = this.route.snapshot.paramMap.get('id') as string;
    const index = this.restaurantSrv.getWishList().findIndex(res => res.id == id);
    this.isInWishlist = index !== -1;

    this.restaurantSubscription = this.store.select(selectRestaurantInfo).subscribe({
      next: (data) => {
        this.isLoading = data.restaurant._id !== id;
        this.restaurant = this.isLoading ? new Restaurant() : data.restaurant;
      },
      complete: () => {
        this.restaurantSubscription.unsubscribe();
      }
    });

    this.store.dispatch(getRestaurantInfo({ res_id: id }));
    if (this.isLoading == true) {
      this.store.dispatch(getMenu({ id: id }));
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.handleMobileScreen();
  }

  handleMobileScreen(): void {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    } else this.isMobile = false;
  }

  toggleWishlist() {
    const restaurant = new RestaurantRecommended(
      this.restaurant._id,
      this.restaurant.restaurant_name,
      this.restaurant.cuisine_categories,
      this.restaurant.avatar,
      this.restaurant.rating,
      this.restaurant.distance,
      this.restaurant.duration,
      false,
    );

    const index = this.restaurantSrv.getWishList().findIndex(res => res.id == restaurant.id);

    this.isInWishlist = index === -1;
    this.restaurantSrv.addToWishList(restaurant);
  }

  goBack() {
    window.history.back();
  }
}
