import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { FoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { RestaurantCategory } from 'src/app/core/models/restaurant/restaurant-category.model';
import { selectMenu } from 'src/app/core/store/restaurant/restaurant.selectors';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('tabsNav') tabsNav!: ElementRef;
  @ViewChild('tabsContainer') tabsContainer!: ElementRef;
  @ViewChild('menuTabMobile') menuTabMobile!: ElementRef;
  @ViewChild('tabContent') tabContent!: ElementRef;
  @ViewChild('autoCompleteInput') autoCompleteInput!: ElementRef;
  @ViewChild('searchResultContainer', { static: true }) searchResultContainer!: ElementRef;
  menu: RestaurantCategory<FoodItems<string>>[] = [];
  selectedCategory: number = 0;
  tabsPosition: number = 0;
  stepScrollTabValue: number = 300;
  isHandlingButtonTab = false;
  visibleCuisineDrawer: boolean = false;
  searching: boolean = false;
  searchValue?: string = '';
  filteredOptions: string[] = [];
  foodItems = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.selectedCategory = 0;
    this.store.select(selectMenu).pipe(
      filter(data => data.error == '' && data.isLoading == false)
    ).subscribe(data => {
      this.menu = data.menu;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    if (this.searching)
      return;
    if (this.tabContent.nativeElement.getBoundingClientRect().top <= 96) {
      this.renderer.removeClass(this.menuTabMobile.nativeElement, 'hidden');
      this.renderer.addClass(this.menuTabMobile.nativeElement, 'flex');
    }
    else {
      this.renderer.removeClass(this.menuTabMobile.nativeElement, 'flex');
      this.renderer.addClass(this.menuTabMobile.nativeElement, 'hidden');
    }
  }

  openSearchInput(): void {
    this.searching = true;
    this.searchValue = '';
    setTimeout(() => {
      this.autoCompleteInput.nativeElement.focus();
    }, 100);
  }

  blurAutoComplete(): void {
    if (this.searchValue == '') {
      this.searching = false;
    }
  }

  onChange(value: string): void {
    this.filteredOptions = this.foodItems.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    let menuTabMobileContainerBottom = this.menuTabMobile.nativeElement.getBoundingClientRect().bottom;
    let tabContentTop = this.tabContent.nativeElement.getBoundingClientRect().top;

    setTimeout(() => {
      window.scrollBy(0, tabContentTop - menuTabMobileContainerBottom);
    }, 100);
  }

  goBack(): void {
    window.history.back();
  }

  openCuisineDrawer(): void {
    this.visibleCuisineDrawer = true;
  }

  closeCuisineDrawer(): void {
    this.visibleCuisineDrawer = false;
  }

  selectResCate(index: number): void {
    this.selectedCategory = index;

    if (this.visibleCuisineDrawer) {
      this.visibleCuisineDrawer = false;
      const contentElement = this.el.nativeElement.querySelector(`#section${index + 1}`);
      if (contentElement) {
        const contentOffsetTop = contentElement.offsetTop;
        const menuTabMobileContainerBottom = this.menuTabMobile.nativeElement.getBoundingClientRect().bottom;
        const scrollPosition = contentOffsetTop - menuTabMobileContainerBottom;
        setTimeout(() => {
          window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
        }, 350);
      }
    }
    else {
      let tab = this.tabsNav.nativeElement.children[index].getBoundingClientRect();
      let tabContainerPos = this.tabsContainer.nativeElement.getBoundingClientRect();

      if (tab.right > tabContainerPos.right) {
        this.tabsPosition -= tab.right - tabContainerPos.right;
      }
      else if (tab.left < tabContainerPos.left) {
        this.tabsPosition -= tab.left - tabContainerPos.left;
      }

      const contentElement = this.el.nativeElement.querySelector(`#section${index + 1}`);
      const restaurantInfor = document.getElementById(`restaurant-infor`);
      const header = document.getElementById('header');

      if (contentElement && header && restaurantInfor) {
        const contentOffsetTop = contentElement.offsetTop;
        const tabsContainerBottom = tabContainerPos.bottom;
        const restaurantInforBottom = restaurantInfor.getBoundingClientRect().bottom;

        if (restaurantInforBottom - header.offsetHeight > 0) {
          const scrollPosition = (contentOffsetTop - tabsContainerBottom) + (restaurantInforBottom - header.offsetHeight);
          window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
        }
        else {
          const scrollPosition = contentOffsetTop - tabsContainerBottom;
          window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
        }
      }
    }

  }

  handleButtonTab(step: number): void {
    if (this.isHandlingButtonTab) {
      return;
    }
    this.isHandlingButtonTab = true;
    let tabNavPos = this.tabsNav.nativeElement.getBoundingClientRect();
    let tabContainerPos = this.tabsContainer.nativeElement.getBoundingClientRect();
    if ((step < 0 && tabNavPos.left < tabContainerPos.left) || (step > 0 && tabNavPos.right > tabContainerPos.right)) {
      if ((step > 0 && tabNavPos.right - step >= tabContainerPos.right) || (step < 0 && tabNavPos.left - step <= tabContainerPos.left)) {
        this.tabsPosition -= step;
      }
      else {
        this.tabsPosition -= (step > 0 ? tabNavPos.right - tabContainerPos.right : tabNavPos.left - tabContainerPos.left);
      }
    }
    setTimeout(() => {
      this.isHandlingButtonTab = false;
    }, 300);
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private store: Store
  ) { this.filteredOptions = this.foodItems; }

}
