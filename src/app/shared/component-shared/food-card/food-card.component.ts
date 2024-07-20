import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzDrawerPlacement, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { Subscription } from 'rxjs';
import { FoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { ModifierGroups } from 'src/app/core/models/restaurant/modifier-groups.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { getFoodDetails } from 'src/app/core/store/restaurant/restaurant.actions';
import { FoodDetailsComponent } from '../food-details/food-details.component';
import { DotSpinnerComponent } from '../loaders/dot-spinner/dot-spinner.component';

const plugins = [
  CommonModule,
  FoodDetailsComponent,
  DotSpinnerComponent
];
@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
  standalone: true,
  imports: plugins
})
export class FoodCardComponent implements OnInit {
  @Input() foodInfor = new FoodItems<string>();
  foodDetails = new FoodItems<ModifierGroups>();
  drawerRef?: NzDrawerRef<any, any>;
  foodDetailsSubscription?: Subscription;
  isAddToCard: boolean = false;

  placementDrawer: NzDrawerPlacement = 'right';


  @HostListener('window:resize', ['event'])
  onResize(event: any) {
    this.handleMobileScreen();
  }

  handleMobileScreen() {
    if (window.innerWidth <= 768) {
      this.placementDrawer = 'bottom';
    }
    else this.placementDrawer = 'right';
  }

  showDetails() {
    if (!this.isAddToCard) {
      this.isAddToCard = true;
      setTimeout(() => {
        this.createFoodDetailsDrawer();
        this.store.dispatch(getFoodDetails({ id: this.foodInfor._id }));
        this.isAddToCard = false;
      }, 500);
    }
  }

  createFoodDetailsDrawer() {
    this.drawerRef = this.drawerSrv.create<FoodDetailsComponent, { foodDetails: FoodItems<ModifierGroups>; }, FoodItems<ModifierGroups>>({
      nzClosable: false,
      nzPlacement: this.placementDrawer,
      nzWidth: '600px',
      nzHeight: '100%',
      nzWrapClassName: 'food-detail-drawer',
      nzKeyboard: true,
      nzContent: FoodDetailsComponent,
    });
  }

  ngOnInit(): void {
    this.handleMobileScreen();
  }

  constructor(
    private store: Store,
    private drawerSrv: NzDrawerService,
    private restaurantSrv: RestaurantService
  ) { }
}
