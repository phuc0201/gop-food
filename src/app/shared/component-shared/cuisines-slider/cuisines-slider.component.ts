import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CuisineCategory } from 'src/app/core/models/cuisine/cuisine-category.model';
import { CuisineService } from 'src/app/core/services/cuisine.service';
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
export class CuisinesSliderComponent implements AfterViewInit, OnChanges, OnInit {
  @Input() sortListCuisine: any;
  @ViewChild('cuisinesSlider') swiperEl!: ElementRef;
  cuisineCategories: CuisineCategory[] = [];

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
    injectStyles: [':host .swiper-button-next svg, :host .swiper-button-prev svg { display: none; } :host .swiper-button-prev { display: none } :host .swiper-pagination-bullet-active {  background-color: #00b14f !important; width:20px; border-radius:5px }'],
  };

  private handleCuisineRoute(url: string): void {
    const segments = url.split('/');
    if (segments.includes('cuisines') && segments.length > 2) {
      const cuisineId = segments[2];
      const index = this.cuisineCategories.findIndex(cuisines => cuisines.id == cuisineId);
      if (index > -1) {
        const [cuisine] = this.cuisineCategories.splice(index, 1);
        this.cuisineCategories.unshift(cuisine);
      }
    }
  }

  ngOnInit(): void {
    this.cuisineSrc.getCuisineCategories().subscribe({
      next: res => {
        this.cuisineCategories = res;
      },
      complete: () => {
        this.handleCuisineRoute(this.router.url);
      }
    });
  }

  ngAfterViewInit(): void {
    Object.assign(this.swiperEl.nativeElement, this.swiperParams);
    this.swiperEl.nativeElement.initialize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes["sortListCuisine"]) {
    //   this.listCuisine = [...this.sortListCuisine];
    // }
  }


  constructor(
    private cuisineSrc: CuisineService,
    private router: Router
  ) { }
}
