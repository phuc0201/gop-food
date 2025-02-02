import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Restaurant, RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  isMobile: boolean = false;
  isLoading: boolean = true;
  restaurant = new Restaurant();
  isInWishlist: boolean = false;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private restaurantSrv: RestaurantService
  ) { }

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    this.handleMobileScreen();

    const id = this.route.snapshot.paramMap.get('id') as string;
    this.restaurantSrv.getRestaurantInfo(id).subscribe({
      next: data => {
        this.restaurant = data;
        if (this.restaurant._id !== '') {
          this.isLoading = false;
        }
      }
    });
    // this.store.dispatch(getMenu({ id: id }));
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
    const index = this.restaurantSrv.getWishList().findIndex(res => res._id == restaurant._id);

    this.isInWishlist = index === -1;
    this.restaurantSrv.addToWishList(restaurant);
  }
}
