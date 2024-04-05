import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzDrawerComponent, NzDrawerModule, NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';

const plugins = [
  CommonModule,
  NzDrawerModule,
  TranslateModule,
  NzModalModule
];
@Component({
  selector: 'app-drawer-cart',
  templateUrl: './drawer-cart.component.html',
  styleUrls: ['./drawer-cart.component.scss'],
  standalone: true,
  imports: plugins,
})
export class DrawerCartComponent implements OnChanges {
  @Input() opened: boolean = false;
  @Output() openedChange = new EventEmitter<boolean>();
  langData: string = 'SHARED.COMPONENT_SHARED.DRAWER.';
  @ViewChild('cartDrawer') drawer!: NzDrawerComponent;
  placementDrawer: NzDrawerPlacement = 'right';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth < 992) {
      this.placementDrawer = 'bottom';
    }
    else this.placementDrawer = 'right';
  }
  constructor(
    private translate: TranslateService,
    private render: Renderer2
  ) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
  }

  openModal(): void {

  }

  closeDrawer(): void {
    this.opened = false;
    this.openedChange.emit(this.opened);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}
