import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map } from 'rxjs';
import { Restaurant, RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { selectCampaigns } from 'src/app/core/store/campaign/campaign.selectors';
import { CampaignsState } from 'src/app/core/store/campaign/campaign.state';
import { RestaurantInfoDetailsComponent } from '../restaurant-info-details/restaurant-info-details.component';


@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.scss']
})
export class RestaurantInfoComponent implements OnInit, OnChanges {
  @Input() isLoading: boolean = true;
  @Input() restaurant = new Restaurant();
  @Input() reviewsCount: number = 0;

  campaigns$ = this.store.select(selectCampaigns).pipe(
    map((state: CampaignsState) => state.campaigns)
  );
  distance: number = 0;
  duration: string = '';
  isVisibleRatingsAndReviews: boolean = false;
  isVisibleCampaignDrawer: boolean = false;
  isInWishlist: boolean = false;
  isMobile: boolean = false;
  isCopied: boolean = false;

  constructor(
    private restaurantSrv: RestaurantService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private store: Store
  ) { }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    } else this.isMobile = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurant'] && changes['restaurant'].currentValue._id !== '') {
      if (this.restaurant.distance && this.restaurant.duration) {
        this.distance = parseFloat((this.restaurant.distance / 1000).toFixed(2));
        let duration = parseFloat((this.restaurant.duration / 60).toFixed(0));

        this.duration = duration < 60 ? duration + 'm' : (parseFloat((duration / 60).toFixed(0)) + 'h');
      }

      const index = this.restaurantSrv.getWishList().findIndex(res => res.id == this.restaurant._id);
      this.isInWishlist = index !== -1;
    }
  }

  ngOnInit(): void {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    } else this.isMobile = false;
  }

  createModal() {
    return this.modal.create<RestaurantInfoDetailsComponent, Restaurant>({
      nzContent: RestaurantInfoDetailsComponent,
      nzClosable: false,
      nzWrapClassName: 'restaurant-info-details-modal',
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
      nzData: this.restaurant
    });
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

  copyCurrentUrlToClipboard() {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      this.isCopied = true;
    }).catch(err => {
      console.error('Failed to copy URL: ', err);
    });
  }
}
