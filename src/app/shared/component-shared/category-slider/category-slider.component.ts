import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategorySlider } from 'src/app/core/models/restaurant/restaurant-category.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';

const plugins = [
  CommonModule,
  RouterModule
];
@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.scss'],
  standalone: true,
  imports: plugins,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategorySliderComponent implements AfterViewInit, OnChanges, OnInit {
  @ViewChild('categoriesSlider') swiperEl!: ElementRef;
  // listCuisine = [...CuisineCategory];
  categories: CategorySlider[] = [];
  swiperParams = {
    slidesPerView: 3,
    Infinity: true,
    spaceBetween: 10,
    speed: 1000,
    breakpoints: {
      992: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 5,
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


  ngOnInit(): void {
    this.restaurantSrv.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  ngAfterViewInit(): void {
    Object.assign(this.swiperEl.nativeElement, this.swiperParams);
    this.swiperEl.nativeElement.initialize();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  constructor(
    private restaurantSrv: RestaurantService,
  ) { }
}
