import { Component, HostListener, OnInit } from '@angular/core';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  hiddenBanner: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY >= 256) {
      this.hiddenBanner = true;
    } else {
      this.hiddenBanner = false;
    }
  }
  ngOnInit(): void {

  }

}
