import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SystemConstant } from "../constants/system.constant";
import { URLConstant } from "../constants/url.constant";
import { Bill, Cart, CreateOrderDTO, OrderDetails, OrderHistory, OrderTracking, Quote } from "../models/order/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = URLConstant.API.ENDPOINT;
  private newCartItems;
  basket: Observable<Cart>;
  constructor(
    private http: HttpClient
  ) {
    this.newCartItems = new BehaviorSubject<Cart>(this.getCartItems());
    this.basket = this.newCartItems.asObservable();
  }

  addToCart(cart: Cart) {
    cart.subtotal = this.caculateSubtotal(cart);
    localStorage.setItem(SystemConstant.BASKET, JSON.stringify(cart));
    this.newCartItems.next(cart);
  }

  updateCart(cart: Cart) {
    console.log('update cart');
    cart.subtotal = this.caculateSubtotal(cart);
    localStorage.setItem(SystemConstant.BASKET, JSON.stringify(cart));
    this.newCartItems.next(cart);
  }

  removeCart() {
    localStorage.removeItem(SystemConstant.BASKET);
  }

  removeFoodItem(id: string) {
    const basket = this.getCartItems();
    const newFoodItems = basket.cart.items.filter(item => item.food_id !== id);
    basket.cart.items = newFoodItems;
    this.updateCart(basket);
  }

  getCartItems(): Cart {
    const basket = localStorage.getItem(SystemConstant.BASKET);
    return basket ? JSON.parse(basket) : new Cart();
  }

  quoteOrder(dto: CreateOrderDTO<string>): Observable<Quote> {
    return this.http.post<Quote>(this.baseUrl + URLConstant.API.ORDER.QUOTE, dto);
  }

  caculateSubtotal(basket: Cart): number {
    basket.subtotal = basket.cart.items.reduce((total_price, item) => {
      const itemTotal = ((item.price ?? 0) + item.modifiers.reduce((price, modifier) => price + modifier.price, 0)) * item.quantity;
      return total_price + itemTotal;
    }, 0);
    return basket.subtotal;
  }

  createOrderDTO(basket: Cart): CreateOrderDTO<string> {
    const order = new CreateOrderDTO<string>();
    order.items = [];
    order.campaign_ids = basket.cart.campaign_ids;
    order.restaurant_id = basket.cart.restaurant_id;
    order.delivery_location = {
      type: "Point",
      address: basket.cart.delivery_location.address,
      coordinates: basket.cart.delivery_location.coordinates
    };
    basket.cart.items.map(foodItem => {
      const modifiers = foodItem.modifiers.map(md => md._id);
      order.items.push({
        food_id: foodItem.food_id,
        quantity: foodItem.quantity,
        modifiers: modifiers,
      });
    });
    order.payment_method = basket.cart.payment_method;
    return order;
  }

  placeOrder(dto: CreateOrderDTO<string>): Observable<Bill> {
    return this.http.post<Bill>(this.baseUrl + '/order/create/delivery', dto);
  }

  getHistory(): Observable<OrderHistory[]> {
    return this.http.get<OrderHistory[]>(this.baseUrl + '/order/customer/history');
  }

  getOrderDetails(id: string): Observable<OrderDetails> {
    return this.http.get<OrderDetails>(this.baseUrl + `/order/${id}` + '/details');
  }

  trackingOrder(id: string): Observable<OrderTracking> {
    return this.http.get<OrderTracking>(this.baseUrl + `/order/${id}` + '/tracking');
  }
}
