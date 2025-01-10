import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CuisineCategory } from 'src/app/core/mock-data/cuisine-category.data';
import { RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
const plugins = [
  CommonModule,
  RouterModule,
];
@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss'],
  standalone: true,
  imports: plugins,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestaurantCardComponent implements OnChanges, OnInit {
  @Input() restaurant = new RestaurantRecommended();
  isLoadImg: boolean = true;
  cuisine_cate_name: string[] = ['Loading....'];
  distance: number = 0;
  duration: string = '0m';
  hasPromotion: boolean = true;
  checkInWishList: boolean = false;

  getCuisineNameByType() {
    this.cuisine_cate_name = [];
    this.restaurant.cuisine_categories.forEach(type => {
      const cuisine = CuisineCategory.find(item => item.type == type);
      if (cuisine) {
        this.cuisine_cate_name.push(cuisine.name);
      }
    });
  }


  roundUpNumber(number: Number): number {
    return parseFloat(number.toFixed(1));
  }

  checkIsWishLish(id: string): boolean {
    const wl = this.resSrv.getWishList();
    const index = wl.findIndex(item => item._id === id);

    return index !== -1 ? true : false;
  }

  toggleWishlist() {
    const index = this.resSrv.getWishList().findIndex(res => res._id == this.restaurant._id);

    this.checkInWishList = index === -1;
    this.resSrv.addToWishList(this.restaurant);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurant']) {
      this.restaurant = changes['restaurant'].currentValue;
      this.getCuisineNameByType();

      if (this.restaurant.distance && this.restaurant.duration) {
        this.distance = parseFloat((this.restaurant.distance / 1000).toFixed(2));
        let duration = parseFloat((this.restaurant.duration / 60).toFixed(0));
        this.duration = duration < 60 ? duration + 'm' : (parseFloat((duration / 60).toFixed(0)) + 'h');
      }
    }
  }

  ngOnInit(): void {
    this.isLoadImg = true;
    const index = this.resSrv.getWishList().findIndex(res => res._id == this.restaurant._id);
    this.checkInWishList = index !== -1;
  }

  constructor(
    private route: Router,
    private resSrv: RestaurantService
  ) { }

}
