import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Restaurant } from 'src/app/core/models/restaurant/restaurant.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { getMenu } from 'src/app/core/store/restaurant/restaurant.action';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  isMobile: boolean = false;
  hiddenBanner: boolean = true;
  isLoading: boolean = true;
  restaurant = new Restaurant();


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY >= 256) {
      this.hiddenBanner = true;
    } else {
      this.hiddenBanner = false;
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
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }
      }
    });
    this.store.dispatch(getMenu({ id: id }));
  }

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private restaurantSrv: RestaurantService
  ) { }
}
