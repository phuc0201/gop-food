import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CuisineCategory } from 'src/app/core/models/cuisine/cuisine-category.model';
import { getCuisines } from 'src/app/core/store/cuisine/cuisine.action';
import { selectCuisines } from 'src/app/core/store/cuisine/cuisine.selector';
import { CuisinesState } from 'src/app/core/store/cuisine/cuisine.state';
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
  sortedCuisineCategories: CuisineCategory[] = [];
  isLoading: boolean = false;
  isImageLoaded: boolean = false;
  cuisineSubscription: Subscription = new Subscription();

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCuisines();
  }

  loadCuisines(): void {
    this.store.select(selectCuisines).subscribe({
      next: (data: CuisinesState) => {
        if (data.result.length > 0) {
          this.cuisineCategories = data.result;
          this.isImageLoaded = true;
          this.isLoading = false;
          this.handleCuisineRoute();
        } else this.isLoading = true;
      },
      error: () => {
        console.log('Error fetching cuisine categories');
      },
    });

    if (this.isLoading === true) {
      this.store.dispatch(getCuisines());
    }
  }

  onImageLoad(): void {
    this.isImageLoaded = true;
  }

  handleCuisineRoute(): void {
    if (this.router.url.split('/').length > 1) {
      const cuisineId = this.router.url.split('/')[2];
      if (cuisineId) {
        const index = this.cuisineCategories.findIndex(cuisine => cuisine.id == cuisineId);
        if (index > -1) {
          const cuisineCategoriesCopy = [...this.cuisineCategories];
          const [cuisine] = cuisineCategoriesCopy.splice(index, 1);
          this.sortedCuisineCategories = cuisineCategoriesCopy;
          this.sortedCuisineCategories.unshift(cuisine);
        }
      } else this.sortedCuisineCategories = [...this.cuisineCategories];
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
