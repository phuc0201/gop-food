import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SystemConstant } from "../constants/system.constant";
import { URLConstant } from "../constants/url.constant";
import { Basket, Bill, CreateOrderDTO, OrderDetails, OrderHistory, OrderTracking, Quote } from "../models/order/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = URLConstant.API.ENDPOINT;
  private newCartItems;
  basket: Observable<Basket>;
  constructor(
    private http: HttpClient
  ) {
    this.newCartItems = new BehaviorSubject<Basket>(this.getBasket());
    this.basket = this.newCartItems.asObservable();
  }

  addToCart(cart: Basket) {
    cart.subtotal = this.caculateSubtotal(cart);
    localStorage.setItem(SystemConstant.BASKET, JSON.stringify(cart));
    this.newCartItems.next(cart);
  }

  updateCart(basket: Basket) {
    if (basket.cart.items.length === 0) {
      basket = new Basket();
    }
    else {
      basket.subtotal = this.caculateSubtotal(basket);
    }

    localStorage.setItem(SystemConstant.BASKET, JSON.stringify(basket));
    this.newCartItems.next(basket);
  }

  removeCart() {
    localStorage.removeItem(SystemConstant.BASKET);
  }

  removeFoodItem(id: string) {
    const basket = this.getBasket();
    const newFoodItems = basket.cart.items.filter(item => item.food_id !== id);
    basket.cart.items = newFoodItems;
    this.updateCart(basket);
  }

  getBasket(): Basket {
    const basket = localStorage.getItem(SystemConstant.BASKET);
    return basket ? JSON.parse(basket) : new Basket();
  }

  quoteOrder(dto: CreateOrderDTO<string>): Observable<Quote> {
    return this.http.post<Quote>(this.baseUrl + URLConstant.API.ORDER.QUOTE, dto);
  }

  caculateSubtotal(basket: Basket): number {
    basket.subtotal = basket.cart.items.reduce((total_price, item) => {
      const itemTotal = ((item.price ?? 0) + item.modifiers.reduce((price, modifier) => price + modifier.price, 0)) * item.quantity;
      return total_price + itemTotal;
    }, 0);
    return basket.subtotal;
  }

  createOrderDTO(basket: Basket): CreateOrderDTO<string> {
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

  reOrder(orderId: string) {
    let params = new HttpParams()
      .set('orderId', orderId);

    return this.http.get<any>(this.baseUrl + '/order/customer/re-order', { params });
  }

  getOrderHistory(filter: { status: string, searchValue: string; }): Observable<OrderHistory[]> {
    let params = new HttpParams()
      .set('status', filter.status)
      .set('searchValue', filter.searchValue);
    return this.http.get<OrderHistory[]>(this.baseUrl + '/order/customer/history', { params });
  }

  getOrderDetails(billId: string): Observable<OrderDetails> {
    return this.http.get<OrderDetails>(this.baseUrl + `/order/${billId}` + '/details');
  }

  trackingOrder(id: string): Observable<OrderTracking> {
    return this.http.get<OrderTracking>(this.baseUrl + `/order/${id}` + '/tracking');
  }
}
