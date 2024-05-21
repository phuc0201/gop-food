import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { skip, take } from 'rxjs';
import { URLConstant } from 'src/app/core/constants/url.constant';
import { AuthService } from 'src/app/core/services/auth.service';
import { selectToken } from 'src/app/core/store/auth/auth.selectors';

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
  stickyHeaderPage: string[] = [URLConstant.ROUTE.CUISINE_PAGE.BASE];
  isSticky: boolean = false;
  isLogged: boolean = false;
  openAuthForm: boolean = false;
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

    if (this.authSrv.isLogged()) {
      this.isLogged = true;
    }

    this.store.select(selectToken).pipe(
      skip(1),
      take(1)).subscribe((auth) => {
        this.isLogged = auth.accessToken != '';
      });
  }

  constructor(
    private translate: TranslateService,
    private router: Router,
    private store: Store,
    private authSrv: AuthService
  ) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
  }
}
