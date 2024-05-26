import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { IRestaurantList } from 'src/app/core/models/common/response-data.model';
import { getRestaurantList } from 'src/app/core/store/restaurant/restaurant.actions';
import { selectRestaurantList } from 'src/app/core/store/restaurant/restaurant.selectors';
import { RestaurantCardComponent } from 'src/app/shared/component-shared/restaurant-card/restaurant-card.component';
import { register } from 'swiper/element/bundle';

register();
const plugin = [
  CommonModule,
  RouterModule,
  RestaurantCardComponent
];

@Component({
  selector: 'app-restaurant-slider',
  templateUrl: './restaurant-slider.component.html',
  styleUrls: ['./restaurant-slider.component.scss'],
  standalone: true,
  imports: plugin,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantSliderComponent implements AfterViewInit, OnInit {
  @ViewChild('restaurantSlider') resSwiper!: ElementRef;
  listRestaurant: number[] = [1];
  restaurants: IRestaurantList = {
    count: 0,
    items: []
  };
  isLoading: boolean = true;

  swiperParams = {
    slidesPerView: 1,
    direction: 'horizontal',
    Infinity: true,
    spaceBetween: 10,
    breakpoints: {
      992: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      576: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      376: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
    },
    loop: true,
    navigation: true,
    on: {
      init: () => { },
      slideChange: () => { },
      activeIndexChange: () => { },
    },
    injectStyles: [':host .swiper-button-next svg, :host .swiper-button-prev svg { width: 20px; height: 20px; color: white  } :host .swiper-button-prev, :host .swiper-button-next { background-color: rgba(41,39,39,.2); height: 40px!important; width: 40px !important; border-radius: 50%}'],
  };

  getRecommendedRestaurants() {
    this.store.dispatch(getRestaurantList());
    this.store.select(selectRestaurantList)
      .subscribe(data => {
        if (data.error === '' && !data.isLoading) {
          this.restaurants = data.restaurants;
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        }
      });
  }

  ngAfterViewInit(): void {
    Object.assign(this.resSwiper.nativeElement, this.swiperParams);
    this.resSwiper.nativeElement.initialize();
  }

  ngOnInit(): void {
    this.getRecommendedRestaurants();
  }
  constructor(
    private store: Store
  ) { }
}
