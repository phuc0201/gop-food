import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getRestaurantInfo } from 'src/app/core/store/restaurant/restaurant.actions';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  hiddenBanner: boolean = false;
  isMobile: boolean = false;
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
  }

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.store.dispatch(getRestaurantInfo({ res_id: id }));
  }
}
