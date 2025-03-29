import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Campaign } from 'src/app/core/models/campaign/campain.model';
import { Restaurant, RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { Review } from 'src/app/core/models/review/review.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { ReviewService } from 'src/app/core/services/review.service';
import { getCampaignAvailableForRestaurant } from 'src/app/core/store/campaign/campaign.actions';
import { fetchMenu, fetchRestaurantDetail } from 'src/app/core/store/restaurant/restaurant.actions';
import { selectRestaurantDetail } from 'src/app/core/store/restaurant/restaurant.selectors';

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
  reviews: Review[] = [];
  restaurantSubscription: Subscription = new Subscription();
  campaigns: Campaign[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private restaurantSrv: RestaurantService,
    private reviewSrv: ReviewService,
  ) { }
  ngOnInit(): void {
    this.handleMobileScreen();
    const slug = this.route.snapshot.paramMap.get('slug') as string;
    const slugLength = slug.split('-').length;
    const id = slug.split('-')[slugLength - 1];

    const index = this.restaurantSrv.getWishList().findIndex(res => res.id == id);
    this.isInWishlist = index !== -1;

    this.restaurantSubscription = this.store.select(selectRestaurantDetail).subscribe({
      next: (data) => {
        this.isLoading = data.restaurant._id !== id;
        this.restaurant = this.isLoading ? new Restaurant() : data.restaurant;

        if (this.restaurant._id !== '') {
          this.getReviews();
        }
      },
      complete: () => {
        this.restaurantSubscription.unsubscribe();
      }
    });

    this.store.dispatch(fetchRestaurantDetail({ restaurantId: id }));
    if (this.isLoading == true) {
      this.store.dispatch(fetchMenu({ restaurantId: id }));
      this.store.dispatch(getCampaignAvailableForRestaurant({ restaurantId: id }));
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

  getReviews(): void {
    this.reviewSrv.getReviews(this.restaurant._id).subscribe({
      next: (data) => {
        this.reviews = data;
      }
    });
  }
}
