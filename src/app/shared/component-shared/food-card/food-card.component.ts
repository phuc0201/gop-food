import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzDrawerPlacement, NzDrawerService } from 'ng-zorro-antd/drawer';
import { Subscription } from 'rxjs';
import { FoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { ModifierGroups } from 'src/app/core/models/restaurant/modifier-groups.model';
import { getFoodDetails } from 'src/app/core/store/restaurant/restaurant.action';
import { FoodDetailsComponent } from '../food-details/food-details.component';
import { DotSpinnerComponent } from '../loaders/dot-spinner/dot-spinner.component';

const plugins = [
  CommonModule,
  DotSpinnerComponent
];
@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
  standalone: true,
  imports: plugins
})
export class FoodCardComponent implements OnInit, OnDestroy {
  @Input() foodInfor = new FoodItems<string>();
  foodDetails = new FoodItems<ModifierGroups>();
  drawerRef?: any;
  foodDetailsSubscription?: Subscription;
  isAddToCard: boolean = false;
  placementDrawer: NzDrawerPlacement = 'right';
  height: number = 0;

  constructor(
    private store: Store,
    private drawerSrv: NzDrawerService,
  ) { }

  ngOnInit(): void {
    this.handleMobileScreen();
  }

  ngOnDestroy(): void {
    if (this.drawerRef) {
      this.drawerRef.close();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleMobileScreen();
  }

  handleMobileScreen() {
    const previousPlacement = this.placementDrawer;
    this.placementDrawer = window.innerWidth <= 768 ? 'bottom' : 'right';

    if (previousPlacement !== this.placementDrawer && this.drawerRef) {
      this.updateDrawerPlacement();
    }
  }

  updateDrawerPlacement() {
    this.drawerRef.nzPlacement = this.placementDrawer;
    this.drawerRef.nzVisible = false;
    setTimeout(() => {
      this.drawerRef.nzVisible = true;
    }, 0);
  }

  showDetails() {
    if (!this.isAddToCard) {
      this.isAddToCard = true;
      this.store.dispatch(getFoodDetails({ id: this.foodInfor._id }));
      setTimeout(() => {
        this.createFoodDetailsDrawer();
        this.isAddToCard = false;
      }, 200);
    }
  }

  createFoodDetailsDrawer() {
    this.drawerRef = this.drawerSrv.create<FoodDetailsComponent, { foodDetails: FoodItems<ModifierGroups>; }, FoodItems<ModifierGroups>>({
      nzClosable: false,
      nzPlacement: this.placementDrawer,
      nzWidth: '600px',
      nzHeight: window.innerHeight + 'px',
      nzWrapClassName: 'food-detail-drawer',
      nzKeyboard: true,
      nzContent: FoodDetailsComponent,
    });
  }
}
