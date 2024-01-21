import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RestaurantCardComponent } from 'src/app/shared/component-shared/restaurant-card/restaurant-card.component';

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
export class RestaurantSliderComponent implements AfterViewInit {
  @ViewChild('restaurantSlider') resSwiper!: ElementRef;
  listRestaurant: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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

  ngAfterViewInit(): void {
    Object.assign(this.resSwiper.nativeElement, this.swiperParams);
    this.resSwiper.nativeElement.initialize();
  }
}
