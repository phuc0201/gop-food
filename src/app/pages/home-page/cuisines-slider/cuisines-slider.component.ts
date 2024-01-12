import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();

export interface ICategory {
  image: string;
  name: string;
}

const plugins = [
  CommonModule,
];

@Component({
  selector: 'app-cuisines-slider',
  templateUrl: './cuisines-slider.component.html',
  styleUrls: ['./cuisines-slider.component.scss'],
  standalone: true,
  imports: plugins,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CuisinesSliderComponent implements AfterViewInit {
  @ViewChild('cuisinesSlider') swiperEl!: ElementRef;
  listCuisine: ICategory[] = [
    {
      name: 'Bánh mì',
      image: 'assets/img/banners/banner-1.jpg',
    },
    {
      name: 'Phở',
      image: 'assets/img/banners/banner-2.jpg',
    },
    {
      name: 'Chè',
      image: 'assets/img/banners/banner-3.jpg',
    },
    {
      name: 'Bánh bao',
      image: 'assets/img/banners/banner-4.jpg',
    },
    {
      name: 'Bánh mì',
      image: 'assets/img/banners/banner-1.jpg',
    },
    {
      name: 'Phở',
      image: 'assets/img/banners/banner-2.jpg',
    },
    {
      name: 'Chè',
      image: 'assets/img/banners/banner-3.jpg',
    },
    {
      name: 'Bánh bao',
      image: 'assets/img/banners/banner-4.jpg',
    },
  ];
  swiperParams = {
    slidesPerView: 2,
    Infinity: true,
    speed: 500,
    spaceBetween: 10,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      992: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      567: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
    loop: true,
    navigation: true,
    on: {
      init: () => { },
      slideChange: () => { },
      activeIndexChange: () => { },
    },
    injectStyles: [
      ':host .swiper-button-next svg, :host .swiper-button-prev svg { width: 15px; color:#676767 }'
    ],
  };
  ngAfterViewInit(): void {
    Object.assign(this.swiperEl.nativeElement, this.swiperParams);
    this.swiperEl.nativeElement.initialize();
  }
}