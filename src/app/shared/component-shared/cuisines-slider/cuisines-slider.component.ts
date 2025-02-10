import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, distinctUntilChanged, EMPTY, Subscription, tap } from 'rxjs';
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
  isLoading: boolean = true;
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
    this.cuisineSubscription = this.store.select(selectCuisines).subscribe((res: CuisinesState) => {
      this.cuisineCategories = res.result;
      this.sortedCuisineCategories = res.result;
      this.isLoading = res.isLoading;
      this.isImageLoaded = true;
      this.handleCuisineRoute();
    });

    if (this.cuisineCategories.length == 0) {
      this.store.dispatch(getCuisines());
      this.cuisineSubscription.unsubscribe();
      this.cuisineSubscription = this.store.select(selectCuisines).pipe(
        distinctUntilChanged(),
        tap((res: CuisinesState) => {
          if (res.result.length > 0) {
            this.cuisineCategories = res.result;
            this.sortedCuisineCategories = res.result;
            this.isLoading = res.isLoading;
            this.onImageLoad();
            this.handleCuisineRoute();
          }
        }),
        catchError((error) => {
          console.error('Error fetching cuisine categories:', error);
          this.isLoading = false;
          return EMPTY;
        }),
      ).subscribe();
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
          const cuisineCategoriesCopy = [...this.sortedCuisineCategories];
          const [cuisine] = cuisineCategoriesCopy.splice(index, 1);
          this.sortedCuisineCategories = cuisineCategoriesCopy;
          this.sortedCuisineCategories.unshift(cuisine);
        }
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
