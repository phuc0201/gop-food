import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, distinctUntilChanged, EMPTY, finalize, Subscription, tap } from 'rxjs';
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
      this.isLoading = res.isLoading;
      this.isImageLoaded = true;
    });

    if (this.cuisineCategories.length == 0) {
      this.store.dispatch(getCuisines());
      this.cuisineSubscription.unsubscribe();
      this.cuisineSubscription = this.store.select(selectCuisines).pipe(
        distinctUntilChanged(),
        tap((res: CuisinesState) => {
          if (res.result.length > 0) {
            this.cuisineCategories = res.result;
            this.isLoading = res.isLoading;
            this.onImageLoad();
          }
        }),
        catchError((error) => {
          console.error('Error fetching cuisine categories:', error);
          this.isLoading = false;
          return EMPTY;
        }),
        finalize(() => {
          this.handleCuisineRoute(this.router.url);
        })
      ).subscribe();
    }
  }

  onImageLoad(): void {
    setTimeout(() => {
      this.isImageLoaded = true;
    }, 500);
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
