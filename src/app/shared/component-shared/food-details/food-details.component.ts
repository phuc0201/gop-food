import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { Restaurants } from 'src/app/core/mock-data/restaurants.data';
import { IFoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { IModifierGroups } from 'src/app/core/models/restaurant/modifier-groups.model';
import { IModifier } from 'src/app/core/models/restaurant/modifier.mode';
import { IRestaurant } from 'src/app/core/models/restaurant/restaurant.model';

export interface FormControls {
  [key: string]: FormControl;
}
export const plugins = [
  CommonModule,
  NzFormModule,
  NzDrawerModule,
  FormsModule,
  NzInputModule,
  NzButtonModule,
  ReactiveFormsModule,
  NzRadioModule,
  NzCheckboxModule
];
@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.scss'],
  standalone: true,
  imports: plugins
})
export class FoodDetailsComponent implements OnInit, AfterViewInit {
  @Input() visibleFormDrawer: boolean = false;
  @Output() visibleFormDrawerChange = new EventEmitter<boolean>();
  quantity: number = 1;
  modifierList: IModifier[] = [];
  restaurantData: IRestaurant[] = Restaurants;
  foodDetails: IFoodItems = {
    id: '',
    name: '',
    bio: '',
    image: '',
    price: 0,
    modifier_groups: []
  };

  constructor(private fb: FormBuilder) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.foodDetails = { ...this.restaurantData[0].restaurant_categories[0].food_items[0] };
    this.foodDetails.modifier_groups.forEach(item => {
      if (item.max == 1) {
        this.modifierList.push(item.modifier[0]);
      }
    });
  }

  addOption(modifier: IModifier, modifier_groups: IModifierGroups): void {
    if (this.modifierList.length > 0) {
      this.modifierList = this.modifierList.map(item => modifier_groups.modifier.includes(item) ? modifier : item);
    } else {
      this.modifierList.push(modifier);
    }
  }

  addExtraDish(event: boolean, option: IModifier): void {
    if (event) {
      this.modifierList.push(option);
    }
    else {
      this.removeFromModifierList(option);
    }
  }

  removeFromModifierList(modifier: IModifier): void {
    let index = this.modifierList.indexOf(modifier);
    if (index > -1) {
      this.modifierList.splice(index, 1);
    }
  }

  addToCart(): void {
    console.log(this.modifierList);
  }

  increaseQuantity(): void {
    if (this.quantity <= 50) {
      this.quantity += 1;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  close(): void {
    this.visibleFormDrawerChange.emit(false);
  }
}
