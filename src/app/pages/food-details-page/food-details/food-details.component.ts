import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap, take, tap } from 'rxjs';
import { Cart } from 'src/app/core/models/order/order.model';
import { FoodItemDTO, FoodItems } from 'src/app/core/models/restaurant/food-items.model';
import { ModifierGroups } from 'src/app/core/models/restaurant/modifier-groups.model';
import { Modifier } from 'src/app/core/models/restaurant/modifier.model';
import { Restaurant } from 'src/app/core/models/restaurant/restaurant.model';
import { ReviewDTO, ReviewFoodItem } from 'src/app/core/models/review/review.model';
import { FormatService } from 'src/app/core/services/common/format.serive';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { OrderService } from 'src/app/core/services/order.service';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { ReviewService } from 'src/app/core/services/review.service';
import { selectRestaurantInfo } from 'src/app/core/store/restaurant/restaurant.selectors';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.scss']
})
export class FoodDetailsComponent implements OnInit {
  foodDetails = new FoodItems<ModifierGroups>();
  modifiersSelected: Modifier[] = [];
  quantity: number = 1;
  isLoading: boolean = true;
  isAddToCart: boolean = false;
  isUpdate: boolean = false;
  reviews: ReviewFoodItem[] = [];
  reviewDTO = new ReviewDTO();
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.resSrv.getFoodDetails(id).subscribe(data => {
      this.foodDetails = data;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });

    this.getReview();
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

  addToCart(): void {
    let basket = this.orderSrv.getCartItems();
    this.isAddToCart = true;
    this.store.select(selectRestaurantInfo).pipe(
      take(1),
      switchMap(data => this.handleRestaurantChange(data.restaurant, basket)),
      switchMap(cartItems => this.setDeliveryLocation(cartItems)),
    ).subscribe(cartItems => {
      this.finalizeCart(cartItems);
    });
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
      }, 700);
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

  formatDate(date: string): string {
    return this.formatService.formatDate(date);
  }

  get getRatingPoint() {
    const rating = this.foodDetails.reviews.reduce((total, curr) => {
      return total + curr.rating;
    }, 0);
    return rating / this.foodDetails.reviews?.length;
  }

  getReview() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.reviewSrv.getReviewForFoodItem(id).subscribe(data => {
      this.reviews = data;
    });
  }

  createReview() {
    const review = new ReviewDTO();
    review.content = this.reviewDTO.content;
    review.food_id = this.foodDetails._id;
    review.owner_id = '665026167a34fb68fe3a8339';
    review.rating = this.reviewDTO.rating;
    this.reviewSrv.createReview(review).subscribe({
      complete: () => {
        this.getReview();
        this.reviewDTO = new ReviewDTO();
      }
    });
  }

  constructor(
    private route: ActivatedRoute,
    private resSrv: RestaurantService,
    private geoSrv: GeolocationService,
    private orderSrv: OrderService,
    private store: Store,
    private formatService: FormatService,
    private reviewSrv: ReviewService
  ) { }
}
