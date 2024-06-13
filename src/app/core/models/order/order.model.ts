import { FoodItemDTO } from "../restaurant/food-items.model";
import { Modifier } from "../restaurant/modifier.model";

export class DeliveryLocation {
  type: string = 'Point';
  coordinates: number[] = [] ;
  address: string = '';
}

export class CreateOrderDTO<T> {
  restaurant_id: string = '';
  campaign_id: string[] = [];
  delivery_location = new DeliveryLocation();
  items: FoodItemDTO<T>[] = [];
}

export class CreateCartItems extends CreateOrderDTO<Modifier> {
  restaurant_name: string = ''
}

export class Cart {
  cart = new CreateCartItems();
  total_price: number = 0;
}


export class Quote {
  _id: string = '';
  deleted_at: Date | null = null;
  order_type: string = 'DeliveryOrder';
  drivers_reject: string[] = [];
  items: FoodItemDTO<string>[] = [];
  delivery_location = new DeliveryLocation();
  delivery_fare: number = 0;
  order_cost: number = 0;
  distance: number = 0;
  duration: number = 0;
  discount: number = 0;
  total: number = 0;
}

