import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzDrawerComponent, NzDrawerModule } from 'ng-zorro-antd/drawer';
import { ResponsiveDrawerDirective } from 'src/app/shared/widget/directives/responsive-drawer.directive';

const plugins = [
  CommonModule,
  NzDrawerModule,
  TranslateModule,
  ResponsiveDrawerDirective
];
@Component({
  selector: 'app-drawer-cart',
  templateUrl: './drawer-cart.component.html',
  styleUrls: ['./drawer-cart.component.scss'],
  standalone: true,
  imports: plugins,
})
export class DrawerCartComponent {
  @Input() opened: boolean = false;
  @Output() openedChange = new EventEmitter<boolean>();
  langData: string = 'SHARED.COMPONENT_SHARED.DRAWER.';
  @ViewChild('cartDrawer') drawer!: NzDrawerComponent;
  open(): void {
    this.opened = true;
  }

  close(): void {
    this.opened = false;
    this.openedChange.emit(this.opened);
  }

  constructor(private translate: TranslateService) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
  }
}
