import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  isLoading = false;
  constructor(private router: Router) {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     this.isLoading = true;
    //     setTimeout(() => {
    //       this.isLoading = false;
    //     }, 1000);
    //   }
    // });
  }
}
