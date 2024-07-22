import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleMobileScreen();
  }

  handleMobileScreen(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnInit(): void {
    this.handleMobileScreen();
  }
}
