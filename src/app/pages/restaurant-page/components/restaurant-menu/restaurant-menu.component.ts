import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { FoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { RestaurantCategory } from 'src/app/core/models/restaurant/restaurant-category.model';
import { SearchService } from 'src/app/core/services/search.service';
import { selectMenu } from 'src/app/core/store/restaurant/restaurant.selector';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('tabsNav') tabsNav!: ElementRef;
  @ViewChild('tabsContainer') tabsContainer!: ElementRef;
  @ViewChild('menuTabMobile') menuTabMobile!: ElementRef;
  @ViewChild('menuTabPC') menuTabPC!: ElementRef;
  @ViewChild('tabContent') tabContent!: ElementRef;
  @ViewChild('autoCompleteInput') autoCompleteInput!: ElementRef;
  @ViewChild('searchResultContainer', { static: true }) searchResultContainer!: ElementRef;
  menu: RestaurantCategory<FoodItems<string>>[] = [];
  menuSearching: RestaurantCategory<FoodItems<string>>[] = [];
  selectedCategory: number = 0;
  tabsPosition: number = 0;
  stepScrollTabValue: number = 300;
  isHandlingButtonTab = false;
  visibleCuisineDrawer: boolean = false;
  searching: boolean = false;
  searchValue?: string = '';
  filteredOptions: string[] = [];
  foodItems = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
  isLoading: boolean = true;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private store: Store,
    private searchSrv: SearchService
  ) {
    this.filteredOptions = this.foodItems;
    this.search = this.searchSrv.debounce(this.search.bind(this), 500);
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.selectedCategory = 0;
    this.loadData();

    const webbodyMobile = document.getElementById('webbody-mobile');
    if (webbodyMobile) {
      webbodyMobile.addEventListener('scroll', (i) => {
        const top = webbodyMobile.scrollTop;
        if (top > 0) {
          if (this.tabContent !== undefined) {
            const tabContentTop = this.tabContent.nativeElement.getBoundingClientRect().top;
            const isTabContentVisible = tabContentTop <= 96 || this.searchValue !== '';
            const action = isTabContentVisible ? 'addClass' : 'removeClass';
            const oppositeAction = isTabContentVisible ? 'removeClass' : 'addClass';

            this.renderer[action](this.menuTabMobile.nativeElement, 'flex');
            this.renderer[oppositeAction](this.menuTabMobile.nativeElement, 'hidden');

            const contentElement = document.querySelectorAll('#restaurant-menu.tab-content section');

            contentElement.forEach((section, index) => {
              if (section.getBoundingClientRect().top <= 96 && section.getBoundingClientRect().bottom > 96) {
                this.selectedCategory = index;
              }
            });
          }
        }
      });
    }
  }

  onChange(value: string): void {

  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const contentElement = document.querySelectorAll('#restaurant-menu.tab-content section');
    const menuTabPcBottom = this.tabsContainer.nativeElement.getBoundingClientRect().bottom;
    if (contentElement && menuTabPcBottom) {
      contentElement.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= menuTabPcBottom + 50 && section.getBoundingClientRect().bottom > menuTabPcBottom + 50) {
          this.selectedCategory = index;
        }
      });
    }
  }

  openSearchInput(): void {
    this.searching = true;
    setTimeout(() => {
      this.autoCompleteInput.nativeElement.focus();
    }, 100);
  }

  resetSearchValue(): void {
    this.searchValue = '';
    this.searching = false;
    this.menuSearching = this.menu.filter(cate => cate.food_items.length > 0);
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
    const webbodyMobile = document.getElementById('webbody-mobile');

    this.selectedCategory = index;

    if (this.visibleCuisineDrawer && webbodyMobile) {
      this.visibleCuisineDrawer = false;
      const contentElement = this.el.nativeElement.querySelector
        (`#section${index + 1}`);

      if (contentElement) {
        const menuTabMobileContainerBottom = this.menuTabMobile.nativeElement.getBoundingClientRect().bottom;
        const offsetTop = contentElement.getBoundingClientRect().top - menuTabMobileContainerBottom + webbodyMobile.scrollTop;
        webbodyMobile.scrollTo({ top: offsetTop, behavior: 'smooth' });
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
          window.scrollTo({ top: scrollPosition + 40, behavior: 'smooth' });
        }
        else {
          const scrollPosition = contentOffsetTop - tabsContainerBottom;
          window.scrollTo({ top: scrollPosition - 40, behavior: 'smooth' });
        }
      }
    }

  }

  handleButtonTab(step: number): void {
    if (this.isHandlingButtonTab)
      return;

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
    }, 2000);
  }

  search(name: string): void {
    const searchValue = this.searchSrv.normalizeString(name);
    this.menuSearching = this.menu.map(cate => {
      const newCate = { ...cate };
      newCate.food_items = newCate.food_items.filter(food => {
        const fooditemName = this.searchSrv.normalizeString(food.name);
        const foodBio = this.searchSrv.normalizeString(food.bio);
        return fooditemName.includes(searchValue) || foodBio.includes(searchValue);
      });
      return newCate;
    });
    this.menuSearching = this.menuSearching.filter(cate => cate.food_items.length > 0);


    if (this.searching) {
      window.scrollTo(0, 0);
      const webbodyMobile = document.getElementById('webbody-mobile');
      if (webbodyMobile) {
        const tabContentTop = this.tabContent.nativeElement.getBoundingClientRect().top;

        webbodyMobile.scrollTo({ top: webbodyMobile.scrollTop + tabContentTop - 96, behavior: 'smooth' });
      }
    }
  }

  loadData(): void {
    this.isLoading = true;
    this.store.select(selectMenu).pipe(
      filter(data => data.error == '' && data.isLoading == false)
    ).subscribe({
      next: data => {
        this.menu = data.menu;
        this.menuSearching = this.menu.filter(cate => cate.food_items.length > 0);
        this.isLoading = false;
      }
    });
  }
}
