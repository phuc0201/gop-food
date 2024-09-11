import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isLoading = false;
  isMobile: boolean = false;
  isHeaderSticky: boolean = false;
  isHiddenFooter: boolean = true;
  stickyRoutes = ['user', 'order'];
  hiddenFooterRoutes = ['order'];

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.isMobile = window.innerWidth <= 768;
  }

  handleHeaderSticky(): void {
    this.isHeaderSticky = false;
    this.isHiddenFooter = false;
    if (this.router.url != '/') {
      const url = this.router.url.split('/')[1];
      this.isHeaderSticky = this.stickyRoutes.includes(url);
      this.isHiddenFooter = this.hiddenFooterRoutes.includes(url);
    }
  }

  ngOnInit(): void {
    this.handleHeaderSticky();
    this.isMobile = window.innerWidth <= 768;
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.handleHeaderSticky();
    });
  }

  constructor(
    private router: Router,
  ) { }
}
