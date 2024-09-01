import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RestaurantRecommended } from 'src/app/core/models/restaurant/restaurant.model';
import { RestaurantCardComponent } from 'src/app/shared/component-shared/restaurant-card/restaurant-card.component';

const plugin = [
  CommonModule,
  RouterModule,
  RestaurantCardComponent,
];

@Component({
  selector: 'app-restaurant-slider',
  templateUrl: './restaurant-slider.component.html',
  styleUrls: ['./restaurant-slider.component.scss'],
  standalone: true,
  imports: plugin,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantSliderComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('restaurantSlider') resSwiper!: ElementRef;
  @Input() restaurants: RestaurantRecommended[] = [];
  isLoading: boolean = true;
  // private destroy$ = new Subject<void>();

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

  trackByItemId(index: number, item: any): string {
    return item._id;
  }

  ngAfterViewInit(): void {
    Object.assign(this.resSwiper.nativeElement, this.swiperParams);
    this.resSwiper.nativeElement.initialize();
  };

  ngOnInit(): void {
    this.isLoading = true;
  };

  ngOnDestroy(): void {
    // this.destroy$.next();
    // this.destroy$.complete();
  }

  constructor() { }
}
