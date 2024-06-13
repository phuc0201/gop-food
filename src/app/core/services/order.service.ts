import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SystemConstant } from "../constants/system.constant";
import { URLConstant } from "../constants/url.constant";
import { Cart, CreateOrderDTO, Quote } from "../models/order/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = URLConstant.API.ENDPOINT
  private newCartItems;
  basket: Observable<Cart>;
  constructor(
    private http: HttpClient
  ) {
    this.newCartItems = new BehaviorSubject<Cart>(this.getCartItems());
    this.basket = this.newCartItems.asObservable();
  }

  addToCart(cart: Cart) {
    localStorage.setItem(SystemConstant.BASKET, JSON.stringify(cart));
    this.newCartItems.next(cart);
  }

  getCartItems(): Cart {
    const basket = localStorage.getItem(SystemConstant.BASKET);
    return basket ? JSON.parse(basket) : new Cart();
  }

  quoteOrder(dto: CreateOrderDTO<string>): Observable<Quote>{
    return this.http.post<Quote>(this.baseUrl + URLConstant.API.ORDER.QUOTE, dto)
  }

  createOrderDTO(basket: Cart): CreateOrderDTO<string> {
    const order = new CreateOrderDTO<string>()
    order.items = [];
    order.campaign_id = basket.cart.campaign_id;
    order.restaurant_id = basket.cart.restaurant_id
    order.delivery_location = {
      type: "Point",
      address: basket.cart.delivery_location.address,
      coordinates: basket.cart.delivery_location.coordinates
    }
    basket.cart.items.map(foodItem => {
      const modifiers = foodItem.modifiers.map(md => md._id)
      order.items.push({
        food_id: foodItem.food_id,
        quantity: foodItem.quantity,
        modifiers: modifiers
      })
    })
    return order
  }
}
