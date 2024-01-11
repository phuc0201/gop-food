import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
const plugins = [
  CommonModule,
  NzDrawerModule,
  TranslateModule
];
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  standalone: true,
  imports: plugins,
})
export class DrawerComponent {
  @Input() opened: boolean = false;
  @Output() openedChange = new EventEmitter<boolean>();
  langData: string = 'SHARED.COMPONENT_SHARED.DRAWER.';
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
