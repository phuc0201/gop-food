import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzDrawerComponent, NzDrawerModule, NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';


export interface ICart {
  quantity: number;
}

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
  userCart: ICart[] = [
    {
      quantity: 2
    },
    {
      quantity: 3
    },
    {
      quantity: 1
    },
    {
      quantity: 2
    },
    {
      quantity: 3
    },
    {
      quantity: 1
    },
    {
      quantity: 2
    },
    {
      quantity: 3
    },
    {
      quantity: 1
    },
  ];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobileScreen();
  }

  constructor(
    private translate: TranslateService,
    private render: Renderer2
  ) {
    translate.use(localStorage.getItem('language')?.toString() ?? 'vi');
  }

  checkMobileScreen(): void {
    if (window.innerWidth <= 768) {
      this.placementDrawer = 'bottom';
    }
    else this.placementDrawer = 'right';
  }

  increaseQuantity(product: ICart): void {
    if (product.quantity <= 50) {
      product.quantity += 1;
    }
  }

  decreaseQuantity(product: ICart, index: number): void {
    if (product.quantity > 1) {
      product.quantity -= 1;
    }
    else {
      this.userCart.splice(index, 1);
    }
  }

  closeDrawer(): void {
    this.opened = false;
    this.openedChange.emit(this.opened);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkMobileScreen();
  }
}
