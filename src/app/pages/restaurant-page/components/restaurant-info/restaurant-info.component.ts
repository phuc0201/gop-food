import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Campaign } from 'src/app/core/models/campaign/campain.model';
import { Restaurant, RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { RestaurantInfoDetailsComponent } from '../restaurant-info-details/restaurant-info-details.component';


@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.scss']
})
export class RestaurantInfoComponent implements OnInit, OnChanges {
  @Input() isLoading: boolean = true;
  @Input() restaurant = new Restaurant();
  distance: number = 0;
  duration: string = '';
  isVisibleRatingsAndReviews: boolean = false;
  isVisibleCampaignDrawer: boolean = false;
  isInWishlist: boolean = false;
  isMobile: boolean = false;
  campaigns: Campaign[] = [];

  constructor(
    private restaurantSrv: RestaurantService,
    private campaignSrv: CampaignService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
  ) { }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    } else this.isMobile = false;
  }

  ngOnInit(): void {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    } else this.isMobile = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurant'] && changes['restaurant'].currentValue._id !== '') {
      if (this.restaurant.distance && this.restaurant.duration) {
        this.distance = parseFloat((this.restaurant.distance / 1000).toFixed(2));
        let duration = parseFloat((this.restaurant.duration / 60000).toFixed(0));

        this.duration = duration < 60 ? duration + 'm' : (parseFloat((duration / 60).toFixed(0)) + 'h');
      }

      this.campaignSrv.getCampaignsByRestaurantId(this.restaurant._id).subscribe({
        next: (data) => {
          this.campaigns = data;
        }
      });

      const index = this.restaurantSrv.getWishList().findIndex(res => res._id == this.restaurant._id);
      this.isInWishlist = index !== -1;
    }
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
    const index = this.restaurantSrv.getWishList().findIndex(res => res._id == restaurant._id);

    this.isInWishlist = index === -1;
    this.restaurantSrv.addToWishList(restaurant);
  }
}
