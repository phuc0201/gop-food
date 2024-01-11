import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit{
  langData: string = 'LAYOUTS.MAIN_LAYOUT.HEADER.';
  currLang?: string = '';
  money: number = 1200000;
  openDrawer: boolean = false;
  switchLanguage() {
    localStorage.setItem('language', this.currLang ?? 'vi');
    if (this.currLang !== this.translate.currentLang) {
      window.location.reload();
    }
  }

  ngOnInit(): void {
    this.currLang = localStorage.getItem('language')?.toString();
  }

  constructor(private translate: TranslateService) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
  }
}
