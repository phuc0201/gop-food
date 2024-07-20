import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { ModifierGroups } from 'src/app/core/models/restaurant/modifier-groups.model';
import { getFoodDetails } from 'src/app/core/store/restaurant/restaurant.actions';
import { FoodDetailsComponent } from '../food-details/food-details.component';
import { DotSpinnerComponent } from '../loaders/dot-spinner/dot-spinner.component';

const plugins = [
  CommonModule,
  DotSpinnerComponent,
  NzRateModule,
  FormsModule
];

@Component({
  selector: 'app-fooditem-card',
  templateUrl: './fooditem-card.component.html',
  styleUrls: ['./fooditem-card.component.scss'],
  standalone: true,
  imports: plugins
})
export class FooditemCardComponent {
  @Input() fooditem = new FoodItems<string>();
  isAddToCard: boolean = false;
  drawerRef?: NzDrawerRef<any, any>;

  addToCart() {
    this.isAddToCard = true;
    setTimeout(() => {
      this.createFoodDetailsDrawer();
      this.store.dispatch(getFoodDetails({ id: this.fooditem._id }));
      this.isAddToCard = false;
    }, 500);
  }

  redirectToFoodDetails() {
    this.router.navigate(['/food-details', this.fooditem._id]);
  }

  createFoodDetailsDrawer() {
    this.drawerRef = this.drawerSrv.create<FoodDetailsComponent, { foodDetails: FoodItems<ModifierGroups>; }, FoodItems<ModifierGroups>>({
      nzClosable: false,
      nzPlacement: 'right',
      nzWidth: '600px',
      nzHeight: '100%',
      nzWrapClassName: 'food-detail-drawer',
      nzKeyboard: true,
      nzContent: FoodDetailsComponent,
    });
  }


  get getRatingPoint() {
    const rating = this.fooditem.reviews.reduce((total, curr) => {
      return total + curr.rating;
    }, 0);
    return rating / this.fooditem.reviews?.length;
  }

  constructor(
    private router: Router,
    private drawerSrv: NzDrawerService,
    private store: Store,
  ) { }
}
