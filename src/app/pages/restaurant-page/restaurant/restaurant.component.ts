import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Restaurant, RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { getMenu } from 'src/app/core/store/restaurant/restaurant.action';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit, AfterViewInit {
  isMobile: boolean = false;
  isLoading: boolean = true;
  restaurant = new Restaurant();
  isInWishlist: boolean = false;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private restaurantSrv: RestaurantService,
  ) { }

  ngOnInit(): void {
    this.handleMobileScreen();

    const id = this.route.snapshot.paramMap.get('id') as string;
    const index = this.restaurantSrv.getWishList().findIndex(res => res._id == id);
    this.isInWishlist = index !== -1;


    this.store.dispatch(getMenu({ id: id }));
    this.restaurantSrv.getRestaurantInfo(id).subscribe({
      next: data => {
        this.restaurant = data;
        if (this.restaurant._id !== '') {
          this.isLoading = false;
        }
      }
    });

    if (this.isMobile) {
      const webbodyMobile = document.getElementById('webbody-mobile');
      if (webbodyMobile) {
        webbodyMobile.scroll({
          top: 0,
          left: 0,
          behavior: "instant",
        });
      }
    }
    else {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }

  ngAfterViewInit(): void {

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

  goBack() {
    window.history.back();
  }
}
