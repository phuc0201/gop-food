import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UrlConstant } from 'src/app/core/constants/url.constant';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  langData: string = 'LAYOUTS.MAIN_LAYOUT.HEADER.';
  currLang?: string = '';
  money: number = 1200000;
  openDrawer: boolean = false;
  stickyHeaderPage: string[] = [UrlConstant.ROUTE.CUISINE_PAGE.BASE];
  isSticky: boolean = false;

  switchLanguage() {
    localStorage.setItem('language', this.currLang ?? 'vi');
    if (this.currLang !== this.translate.currentLang) {
      window.location.reload();
    }
  }

  ngOnInit(): void {
    this.isSticky = this.stickyHeaderPage.includes('/' + this.router.url.split('/')[1]);
    this.currLang = localStorage.getItem('language')?.toString();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isSticky = this.stickyHeaderPage.includes('/' + this.router.url.split('/')[1]);
      }
    });
  }

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
  }
}
