import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();


const plugins = [
  CommonModule,
];
@Component({
  selector: 'app-home-sldier',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss'],
  standalone: true,
  imports: plugins,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeSliderComponent implements AfterViewInit {
  @ViewChild('swiper') swiperEl!: ElementRef;
  // @Input() listBannerId: string[] = [];
  listBannerSrc: string[] = [
    'assets/img/banners/banner-1.jpg',
    'assets/img/banners/banner-2.jpg',
    'assets/img/banners/banner-3.jpg',
    'assets/img/banners/banner-4.jpg',
  ];
  swiperParams = {
    slidesPerView: 1,
    centeredSlides: true,
    speed: 3000,
    autoplay: {
      delay: 10000,
      pauseOnMouseEnter: true,
    },
    loop: true,
    navigation: true,
    on: {
      init: () => { },
      slideChange: () => { },
      activeIndexChange: () => { },
    },
    injectStyles: [':host .swiper-button-next svg, :host .swiper-button-prev svg { display: none; }'],
  };
  ngAfterViewInit(): void {
    Object.assign(this.swiperEl.nativeElement, this.swiperParams);
    this.swiperEl.nativeElement.initialize();
  }
}
