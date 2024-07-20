import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-sticky-layout',
  templateUrl: './header-sticky-layout.component.html',
  styleUrls: ['./header-sticky-layout.component.scss']
})
export class HeaderStickyLayoutComponent implements OnInit {
  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.isMobile = window.innerWidth <= 768;
  }


  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
  }

}
