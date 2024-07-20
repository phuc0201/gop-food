import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDrawerModule, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { Observable, filter, of, switchMap, take, tap } from 'rxjs';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Cart } from 'src/app/core/models/order/order.model';
import { FoodItemDTO, FoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { ModifierGroups } from 'src/app/core/models/restaurant/modifier-groups.model';
import { Modifier } from 'src/app/core/models/restaurant/modifier.model';
import { Restaurant } from 'src/app/core/models/restaurant/restaurant.model';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { getRestaurantInfo } from 'src/app/core/store/restaurant/restaurant.actions';
import { selectFoodDetails, selectRestaurantInfo } from 'src/app/core/store/restaurant/restaurant.selectors';
import { DotsLoaderComponent } from '../loaders/dots-loader/dots-loader.component';
import { ImgLoaderComponent } from '../loaders/img-loader/img-loader.component';
export const plugins = [
  CommonModule,
  NzDrawerModule,
  FormsModule,
  NzInputModule,
  NzButtonModule,
  NzRadioModule,
  NzCheckboxModule,
  ScrollingModule,
  ImgLoaderComponent,
  NzSkeletonModule,
  DotsLoaderComponent
];
@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.scss'],
  standalone: true,
  imports: plugins,
})
export class FoodDetailsComponent implements OnInit {
  @Input() foodItem = new FoodItemDTO<Modifier>();
  @Input() foodItemIndex: number = 0;
  modifiersSelected: Modifier[] = [];
  foodDetails = new FoodItems<ModifierGroups>();
  quantity: number = 1;
  isLoading: boolean = true;
  isAddToCart: boolean = false;
  isUpdate: boolean = false;

  initial(): void {
    this.store.dispatch(getRestaurantInfo({ res_id: SystemConstant.MERCHANT_ID }));

    this.store.select(selectFoodDetails)
      .pipe(
        filter(data => !data.isLoading && data.foodDetails._id !== ''),
        tap(data => {
          data.foodDetails.modifier_groups.forEach(mdg => {
            if (mdg.min === 1 && mdg.max === 1 && mdg.modifier.length > 0) {
              let check = false;
              for (const md of mdg.modifier) {
                const index = this.modifiersSelected.findIndex(item => item._id == md._id);
                if (index !== -1)
                  check = true;
              }
              if (!check) {
                this.modifiersSelected.push(mdg.modifier[0]);
              }
            }
          });
        })
      )
      .subscribe({
        next: data => {
          this.foodDetails = data.foodDetails;
          setTimeout(() => {
            this.isLoading = false;
            this.isAddToCart = false;
          }, 500);
        }
      });
  }

  checkExtraDishSelected(id: string): boolean {
    const index = this.modifiersSelected.findIndex(md => md._id == id);
    return index !== -1;
  }

  checkOptionSelected(modifier_group: ModifierGroups): Modifier {
    for (const modifier of modifier_group.modifier) {
      const index = this.modifiersSelected.findIndex(md => modifier._id == md._id);
      if (index !== -1) {
        return modifier;
      }
    }
    return modifier_group.modifier[0];
  }

  get getPrice(): number {
    const priceWithModifiers = this.modifiersSelected.reduce((total, currValue) => {
      return total + currValue.price;
    }, 0);
    return this.isLoading ? 0 : (this.quantity * (priceWithModifiers + this.foodDetails.price));
  }

  addOption(modifier: Modifier, modifier_groups: ModifierGroups): void {
    const index = this.modifiersSelected.findIndex(modifier => modifier_groups.modifier.findIndex(md => md._id === modifier._id) !== -1);
    if (index > -1) {
      this.modifiersSelected[index] = modifier;
    } else {
      this.modifiersSelected.push(modifier);
    }
  }

  addExtraDish(event: boolean, option: Modifier): void {
    if (event && this.modifiersSelected.findIndex(md => md._id === option._id) === -1) {
      this.modifiersSelected.push(option);
    }
    else {
      this.removeFromModifierList(option);
    }
  }

  removeFromModifierList(modifier: Modifier): void {
    let index = this.modifiersSelected.findIndex(md => md._id === modifier._id);
    if (index !== -1) {
      this.modifiersSelected.splice(index, 1);
    }
  }

  updateCartItems(cartItems: Cart): Cart {
    const indexFoodExists = cartItems.cart.items.findIndex(md => md.food_id === this.foodDetails._id);
    if (indexFoodExists >= 0 && this.modifiersSelected.length === cartItems.cart.items[indexFoodExists].modifiers.length) {
      let checkFoodExists = true;
      cartItems.cart.items[indexFoodExists].modifiers.map(md => {
        const checkExists = this.modifiersSelected.findIndex(modifier => modifier._id === md._id);

        if (checkExists < 0) {
          checkFoodExists = false;
          return;
        }
      });
      if (!checkFoodExists) {
        cartItems.cart.items.push(this.createCartItem());
      } else {
        cartItems.cart.items[indexFoodExists].quantity += this.quantity;
      }
    }
    else {
      cartItems.cart.items.push(this.createCartItem());
    }

    return cartItems;
  }

  createCartItem(): FoodItemDTO<Modifier> {
    return {
      food_id: this.foodDetails._id,
      quantity: this.quantity,
      food_name: this.foodDetails.name,
      image: this.foodDetails.image,
      modifiers: this.modifiersSelected,
      price: this.foodDetails.price
    };
  }

  addToCart(): void {
    let basket = this.orderSrv.getCartItems();
    this.isAddToCart = true;
    if (!this.isUpdate) {
      this.store.select(selectRestaurantInfo).pipe(
        take(1),
        switchMap(data => this.handleRestaurantChange(data.restaurant, basket)),
        switchMap(cartItems => this.setDeliveryLocation(cartItems)),
      ).subscribe(cartItems => {
        this.finalizeCart(cartItems);
      });
    }
    else {
      basket.cart.items[this.foodItemIndex].modifiers = this.modifiersSelected;
      basket.cart.items[this.foodItemIndex].quantity = this.quantity;
      basket.subtotal = basket.cart.items.reduce((total_price, item) => {
        const itemTotal = ((item.price ?? 0) + item.modifiers.reduce((price, modifier) => price + modifier.price, 0)) * item.quantity;
        return total_price + itemTotal;
      }, 0);

      this.orderSrv.updateCart(basket);

      setTimeout(() => {
        this.isAddToCart = false;
        this.drawerRef.close();
      }, 700);
    }
  }



  handleRestaurantChange(restaurant: Restaurant, basket: Cart): Observable<any> {
    if (basket.cart.restaurant_id !== restaurant._id)
      basket = new Cart();

    basket.cart.restaurant_id = restaurant._id;
    basket.cart.restaurant_name = restaurant.restaurant_name;
    basket.cart.restaurant_location = restaurant.location.coordinates;
    return of(basket);
  }

  setDeliveryLocation(cartItems: Cart): Observable<any> {
    return this.geoSrv.currLocation.pipe(
      tap(location => {
        cartItems.cart.delivery_location = {
          type: "Point",
          address: location.address,
          coordinates: [location.coordinates[1], location.coordinates[0]]
        };
      }),
      switchMap(() => of(cartItems))
    );
  }

  finalizeCart(cartItems: Cart): void {
    if (this.isAddToCart) {
      cartItems = this.updateCartItems(cartItems);
      cartItems.subtotal = cartItems.cart.items.reduce((total_price, item) => {
        const itemTotal = ((item.price ?? 0) + item.modifiers.reduce((price, modifier) => price + modifier.price, 0)) * item.quantity;
        return total_price + itemTotal;
      }, 0);
      this.orderSrv.addToCart(cartItems);
      setTimeout(() => {
        this.isAddToCart = false;
        this.drawerRef.close();
      }, 700);
    }
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

  removeFoodItem() {
    this.orderSrv.removeFoodItem(this.foodDetails._id);
    this.closeDrawer();
  }

  closeDrawer() {
    this.isAddToCart = false;
    this.drawerRef.close();
  }

  ngOnInit(): void {
    this.modifiersSelected = [...this.foodItem.modifiers];
    this.isUpdate = this.foodItem.food_id !== '';
    if (this.foodItem.food_id !== '')
      this.quantity = this.foodItem.quantity;

    this.initial();
  }

  constructor(
    private store: Store,
    private cusProfile: ProfileService,
    private geoSrv: GeolocationService,
    private orderSrv: OrderService,
    private drawerRef: NzDrawerRef<string>,
  ) { }
}
