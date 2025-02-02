import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();

export interface IPromotion {
  name: string,
}

const plugins = [
  CommonModule
];
@Component({
  selector: 'app-promo-slider',
  templateUrl: './promo-slider.component.html',
  styleUrls: ['./promo-slider.component.scss'],
  standalone: true,
  imports: plugins,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PromoSliderComponent implements AfterViewInit, OnInit {
  @ViewChild('promoSlider') swiperEl!: ElementRef;
  listPromo: IPromotion[] = [];
  swiperParams = {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: true,
    breakpoints: {
      992: {
        slidesPerView: 4,
        slidesPerGroup: 4
      },
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3
      },
      576: {
        slidesPerView: 2,
        slidesPerGroup: 2
      }
    },
    on: {
      init: () => { },
      slideChange: () => { },
      activeIndexChange: () => { },
    },
    injectStyles: [':host .swiper-button-next svg, :host .swiper-button-prev svg { display: none; } :host .swiper-pagination-bullet-active {  background-color: #00b14f !important; }'],
  };

  ngAfterViewInit(): void {
    Object.assign(this.swiperEl.nativeElement, this.swiperParams);
    this.swiperEl.nativeElement.initialize();
  }

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.listPromo.push({
        name: 'Giảm 15k, thêm ưu đãi bên dưới'
      });
    }
  }

}
