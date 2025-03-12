import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, fromEvent, Subject, takeUntil } from 'rxjs';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { DiningMode } from 'src/app/core/models/common/enums/index.enum';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('webbodyMobile', { static: true }) webbodyMobile!: ElementRef<HTMLDivElement>;
  isLoading = false;
  isMobile: boolean = false;
  isHeaderSticky: boolean = false;
  isHiddenMobileHeader: boolean = true;
  stickyRoutes = ['user', 'order', 'cuisines', 'wishlist'];
  hiddenMobileHeaderRoutes = ['restaurant'];
  scrollTopValue: number = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.onActivate();
    this.isMobile = window.innerWidth < 768;
    this.handleHeaderSticky();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.handleHeaderSticky();
      this.onActivate();
    });
  }

  ngAfterViewInit() {
    fromEvent(this.webbodyMobile.nativeElement, 'scroll')
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: Event) => {
        const element = event.target as HTMLDivElement;
        this.scrollTopValue = element.scrollTop;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onActivate() {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    if (this.webbodyMobile) {
      this.webbodyMobile.nativeElement.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.isMobile = window.innerWidth < 768;
  }

  handleHeaderSticky(): void {
    this.isHeaderSticky = false;
    this.isHiddenMobileHeader = true;
    if (this.router.url != '/') {
      const url = this.router.url.split('/')[1];
      this.isHeaderSticky = this.stickyRoutes.includes(url);
      this.isHiddenMobileHeader = !this.hiddenMobileHeaderRoutes.includes(url);
    }
    else this.getDiningMode();
  }

  getDiningMode() {
    const diningMode = localStorage.getItem(SystemConstant.DINING_MODE);
    if (diningMode && diningMode === DiningMode.PICKUP && this.router.url == '/') {
      this.isHeaderSticky = true;
    }
    else {
      localStorage.setItem(SystemConstant.DINING_MODE, DiningMode.DELIVERY);
    }
  }
}
