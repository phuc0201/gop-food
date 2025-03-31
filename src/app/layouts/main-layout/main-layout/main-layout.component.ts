import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter, fromEvent, Subject, takeUntil } from 'rxjs';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { DiningMode } from 'src/app/core/models/common/enums/index.enum';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthComponent } from 'src/app/shared/component-shared/auth/auth.component';
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
  stickyRoutes = ['user', 'order', 'cuisines', 'wishlist'];
  hiddenMobileHeaderRoutes = ['restaurant'];
  scrollTopValue: number = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewContainerRef: ViewContainerRef,
    private modal: NzModalService,
    private authSrv: AuthService
  ) { }

  ngOnInit(): void {
    this.doLogin();
    this.onActivate();
    this.isMobile = window.innerWidth < 768;
    this.handleHeaderSticky();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      if (!this.router.url.startsWith(URLConstant.ROUTE.HOMEPAGE)) {
        this.handleHeaderSticky();
      }
      else {
        const storedDiningMode = localStorage.getItem(SystemConstant.DINING_MODE);
        let targetDiningMode: DiningMode;
        targetDiningMode = storedDiningMode === DiningMode.PICKUP ?
          DiningMode.PICKUP : DiningMode.DELIVERY;
        this.router.navigate([URLConstant.ROUTE.HOMEPAGE], {
          queryParams: { diningMode: targetDiningMode },
          replaceUrl: true
        });
      }

      this.onActivate();
    });

    this.route.queryParams.pipe(
      filter(() => this.router.url.startsWith(URLConstant.ROUTE.HOMEPAGE))
    ).subscribe(params => {
      const storedDiningMode = localStorage.getItem(SystemConstant.DINING_MODE);
      const currentDiningMode = params['diningMode'];

      let targetDiningMode: DiningMode;

      if (currentDiningMode) {
        targetDiningMode = currentDiningMode === DiningMode.PICKUP ?
          DiningMode.PICKUP : DiningMode.DELIVERY;
      } else {
        targetDiningMode = storedDiningMode as DiningMode || DiningMode.DELIVERY;
      }

      this.isHeaderSticky = targetDiningMode === DiningMode.PICKUP;
      this.setDiningMode(targetDiningMode);

      if (currentDiningMode !== targetDiningMode) {
        this.router.navigate([URLConstant.ROUTE.HOMEPAGE], {
          queryParams: { diningMode: targetDiningMode },
          replaceUrl: true
        });
      }
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
    if (!this.router.url.startsWith(URLConstant.ROUTE.HOMEPAGE)) {
      const url = this.router.url.split('/')[1];
      this.isHeaderSticky = this.stickyRoutes.includes(url);
    }
  }

  setDiningMode(mode: DiningMode) {
    localStorage.setItem(SystemConstant.DINING_MODE, mode);
  }

  doLogin() {
    this.authSrv.requireLogin$.subscribe({
      next: (res) => {
        if (res == true) {

          this.createAuthModal();
        }
      }
    });
  }

  createAuthModal() {
    return this.modal.create<AuthComponent, any>({
      nzContent: AuthComponent,
      nzClosable: false,
      nzWrapClassName: 'auth-form',
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
      nzData: '',
    });
  }
}
