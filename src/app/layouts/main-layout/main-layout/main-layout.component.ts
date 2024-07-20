import { Component, HostListener, OnInit } from '@angular/core';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isLoading = false;
  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.isMobile = window.innerWidth <= 768;
  }


  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  constructor() {

  }
}
