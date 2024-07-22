import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CuisineCategory } from 'src/app/core/mock-data/cuisine-category.data';
import { register } from 'swiper/element/bundle';
import { GetImageSrcDirective } from '../../widget/directives/get-image-src.directive';
register();

export interface ICategory {
  image: string;
  name: string;
}

const plugins = [
  CommonModule,
  RouterModule,
  GetImageSrcDirective
];

@Component({
  selector: 'app-cuisines-slider',
  templateUrl: './cuisines-slider.component.html',
  styleUrls: ['./cuisines-slider.component.scss'],
  standalone: true,
  imports: plugins,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CuisinesSliderComponent implements AfterViewInit, OnChanges {
  @Input() sortListCuisine: any;
  @ViewChild('cuisinesSlider') swiperEl!: ElementRef;
  listCuisine = [...CuisineCategory];
  swiperParams = {
    slidesPerView: 3,
    Infinity: true,
    spaceBetween: 10,
    speed: 1000,
    // autoplay: {
    //   delay: 2000,
    //   pauseOnMouseEnter: true,
    // },
    breakpoints: {
      768: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      720: {
        slidesPerView: 7,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 6,
        spaceBetween: 10,
      },
      350: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
      270: {
        slidesPerView: 4,
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
    injectStyles: [':host .swiper-button-next svg, :host .swiper-button-prev svg { display: none; } :host .swiper-pagination-bullet-active {  background-color: #00b14f !important; width:20px; border-radius:5px }'],
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["sortListCuisine"]) {
      this.listCuisine = [...this.sortListCuisine];
    }
  }

  ngAfterViewInit(): void {
    Object.assign(this.swiperEl.nativeElement, this.swiperParams);
    this.swiperEl.nativeElement.initialize();
  }
}
