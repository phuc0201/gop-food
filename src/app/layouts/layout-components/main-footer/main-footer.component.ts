import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

const plugins = [
  CommonModule
];
@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
  standalone: true,
  imports: plugins
})
export class MainFooterComponent implements OnInit {
  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.isMobile = window.innerWidth <= 768;
  }


  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
  }
}
