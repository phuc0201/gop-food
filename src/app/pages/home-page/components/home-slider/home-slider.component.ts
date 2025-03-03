import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();


const plugins = [
  CommonModule,
];
@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss'],
  standalone: true,
  imports: plugins,
})
export class HomeSliderComponent implements OnInit {
  listBannerSrc: string[] = [
    'assets/img/banners/banner-1.jpg',
    'assets/img/banners/banner-2.jpg',
    'assets/img/banners/banner-3.jpg',
    'assets/img/banners/banner-4.jpg',
  ];

  currBannerImg = '';

  ngOnInit(): void {
    this.currBannerImg = `assets/img/banners/banner-1.jpg`;
  }
}
