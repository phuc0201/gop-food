import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SystemConstant } from "../constants/system.constant";
import { Cart } from "../models/order/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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
}
