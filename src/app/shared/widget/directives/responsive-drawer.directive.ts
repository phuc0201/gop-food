import { AfterViewInit, Directive, HostListener, Input } from '@angular/core';
import { NzDrawerComponent, NzDrawerPlacement } from 'ng-zorro-antd/drawer';

@Directive({
  selector: '[appResponsiveDrawer]',
  standalone: true
})
export class ResponsiveDrawerDirective implements AfterViewInit {
  @Input() mobileThreshold: number = 768;
  @Input() defaultPlacement: NzDrawerPlacement = 'right';
  @Input('appResponsiveDrawer') nzDrawer!: NzDrawerComponent;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updatePlacement((event.target as Window).innerWidth);
  }

  updatePlacement(windowWidth: number): void {
    if (windowWidth < this.mobileThreshold) {
      this.nzDrawer.nzPlacement = 'bottom';
    } else this.nzDrawer.nzPlacement = this.defaultPlacement;
  }

  ngAfterViewInit(): void {
    this.updatePlacement(window.innerWidth);
  }
}
