import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
  headerNonFixed: boolean = false;
  switchLanguage() {
    localStorage.setItem('language', this.currLang ?? 'vi');
    if (this.currLang !== this.translate.currentLang) {
      window.location.reload();
    }
  }

  ngOnInit(): void {
    this.currLang = localStorage.getItem('language')?.toString();
    this.headerNonFixed = this.router.url === '/' ? false : true;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.headerNonFixed = event.url === '/' ? false : true;
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
