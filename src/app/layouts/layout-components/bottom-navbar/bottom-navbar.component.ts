import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { filter } from 'rxjs';
const plugins = [
  CommonModule,
  RouterModule,
  NzBadgeModule
];
@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss'],
  standalone: true,
  imports: plugins
})
export class BottomNavbarComponent implements OnInit {
  openDrawerCart: boolean = false;
  isShowCartBtn: boolean = false;
  foodCount: number = 0;
  isActive: boolean = true;
  activeBottomNavRoute = ['feed', 'user', 'order', 'wishlist'];


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.handleBottomNavActive();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.handleBottomNavActive();
    });
  }

  handleBottomNavActive() {
    this.isActive = this.activeBottomNavRoute.some(route => this.router.url.startsWith(`/${route}`));
  }
}
