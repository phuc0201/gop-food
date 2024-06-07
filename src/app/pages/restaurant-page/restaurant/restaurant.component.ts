import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Restaurant } from 'src/app/core/models/restaurant/restaurant.model';
import { getMenu, getRestaurantInfo } from 'src/app/core/store/restaurant/restaurant.actions';
import { selectRestaurantInfo } from 'src/app/core/store/restaurant/restaurant.selectors';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  isMobile: boolean = false;
  hiddenBanner: boolean = false;
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

    this.store.select(selectRestaurantInfo).subscribe(data => {
      if (data.error === '' && data.restaurant._id !== '') {
        this.restaurant = data.restaurant;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    });
  }

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.store.dispatch(getRestaurantInfo({ res_id: id }));
    this.store.dispatch(getMenu({ id: id }));
  }
}
