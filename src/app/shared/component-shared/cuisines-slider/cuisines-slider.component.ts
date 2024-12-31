import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CuisineCategory } from 'src/app/core/models/cuisine/cuisine-category.model';
import { CuisineService } from 'src/app/core/services/cuisine.service';
import { register } from 'swiper/element/bundle';
register();

export interface ICategory {
  image: string;
  name: string;
}

const plugins = [
  CommonModule,
  RouterModule,
];

@Component({
  selector: 'app-cuisines-slider',
  templateUrl: './cuisines-slider.component.html',
  styleUrls: ['./cuisines-slider.component.scss'],
  standalone: true,
  imports: plugins,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CuisinesSliderComponent implements OnInit {
  @Input() sortListCuisine: any;
  @ViewChild('cuisinesSlider', { static: true }) cuisineList!: ElementRef;
  cuisineCategories: CuisineCategory[] = [];
  isLoading: boolean = true;

  constructor(
    private cuisineSrc: CuisineService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cuisineSrc.getCuisineCategories().subscribe({
      next: (res: CuisineCategory[]) => {
        this.cuisineCategories = res;
        setTimeout(() => { this.isLoading = false; }, 500);
      },
      error: (error: any) => {
        console.error('Error fetching cuisine categories:', error);
      },
      complete: () => {
        this.handleCuisineRoute(this.router.url);
      }
    });
  }

  handleCuisineRoute(url: string): void {
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

  scrollLeft(): void {
    const list = this.cuisineList.nativeElement;
    const itemWidth = list.children[0].offsetWidth * 2 + 16;
    list.scrollBy({ left: -itemWidth, behavior: 'smooth' });
  }

  scrollRight(): void {
    const list = this.cuisineList.nativeElement;
    const itemWidth = list.children[0].offsetWidth * 2 + 16;
    list.scrollBy({ left: itemWidth, behavior: 'smooth' });
  }
}
