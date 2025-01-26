import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { filter } from 'rxjs';
import { OrderService } from 'src/app/core/services/order.service';
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
  activeBottomNavRoute = ['user', 'order', 'wishlist'];


  constructor(
    private orderSrv: OrderService,
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
    this.isActive = false;

    if (this.router.url == '/') {
      this.isActive = true;
    }
    if (this.router.url != '/') {
      const url = this.router.url.split('/')[1];
      this.isActive = this.activeBottomNavRoute.includes(url);
    }
  }

}
