import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDrawerModule, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { filter, of, switchMap } from 'rxjs';
import { Cart } from 'src/app/core/models/order/order.model';
import { FoodItemDTO, FoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { ModifierGroups } from 'src/app/core/models/restaurant/modifier-groups.model';
import { Modifier } from 'src/app/core/models/restaurant/modifier.model';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProfileService } from 'src/app/core/services/profile.service';
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
  foodDetails = new FoodItems<ModifierGroups>();
  quantity: number = 1;
  modifiersSelected: Modifier[] = [];
  isLoading: boolean = true;
  isAddToCart: boolean = true;

  ngOnInit(): void {
    this.initial();
  }

  initial(): void {
    this.store.select(selectFoodDetails)
    .pipe(
      filter(data => !data.isLoading && data.foodDetails._id !== '')
    )
    .subscribe(data => {
      this.foodDetails = data.foodDetails
      this.modifiersSelected = [];
      this.foodDetails.modifier_groups.forEach(mdg => {
        if (mdg.min === 1 && mdg.max === 1 && mdg.modifier.length > 0) {
          this.modifiersSelected.push(mdg.modifier[0]);
        }
      });

      setTimeout(() => {
        this.isLoading = false;
        this.isAddToCart = false;
      }, 500);
    })
  }

  get getPrice(): number {
    const priceWithModifiers = this.modifiersSelected.reduce((total, currValue) => {
      return total + currValue.price;
    }, 0);
    return this.isLoading ? 0 : (this.quantity * (priceWithModifiers + this.foodDetails.price));
  }

  addOption(modifier: Modifier, modifier_groups: ModifierGroups): void {
    const index = this.modifiersSelected.findIndex(md => modifier_groups.modifier.includes(md));
    if (index > -1) {
      this.modifiersSelected[index] = modifier;
    } else {
      this.modifiersSelected.push(modifier);
    }
  }

  addExtraDish(event: boolean, option: Modifier): void {
    if (event) {
      this.modifiersSelected.push(option);
    }
    else {
      this.removeFromModifierList(option);
    }
  }

  removeFromModifierList(modifier: Modifier): void {
    let index = this.modifiersSelected.indexOf(modifier);
    if (index > -1) {
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
      base_price: this.foodDetails.price
    };
  }

  addToCart(): void {
    let basket = this.orderSrv.getCartItems();
    this.isAddToCart = true;
    const addToCartAction = this.store.select(selectRestaurantInfo).pipe(
      switchMap(data => {
        if (basket.cart.restaurant_id !== data.restaurant._id) {
          basket = new Cart();
        }
        basket.cart.restaurant_id = data.restaurant._id;
        basket.cart.restaurant_name = data.restaurant.restaurant_name
        return of(basket);
      })
    ).subscribe(cartItems => {
      cartItems.cart.delivery_location = {
        address: this.cusProfile.getCustomerProfile().address,
        coordinates: this.location.getLocation()
      };
      cartItems = this.updateCartItems(cartItems);
      cartItems.total_price = cartItems.cart.items.reduce((total_price, item) => {
        return ((total_price + (item.base_price ?? 0)) + item.modifiers.reduce((price, modifier) => {
          return price + modifier.price;
        }, 0)) * item.quantity;
      }, 0);

      this.orderSrv.addToCart(cartItems);
      setTimeout(()=>{
        this.isAddToCart = false;
        this.drawerRef.close();
      }, 700)
    });
    addToCartAction.unsubscribe();
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

  constructor(
    private store: Store,
    private cusProfile: ProfileService,
    private location: GeolocationService,
    private orderSrv: OrderService,
    private drawerRef: NzDrawerRef<string>,
  ) { }
}
