import { Component, OnInit } from '@angular/core';
import { RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist: RestaurantRecommended[] = [];

  ngOnInit(): void {
    this.resSrv.currWishlistCount.subscribe(res => {
      this.wishlist = this.resSrv.getWishList();
    });
  }

  constructor(
    private resSrv: RestaurantService
  ) { }
}
