import { FoodItemDTO } from "../restaurant/food-items.model";
import { Modifier } from "../restaurant/modifier.model";

export class CreateOrderDTO<T> {
  restaurant_id: string = '';
  campaign_id: string[] = [];
  delivery_location: {
    address: string;
    coordinates: number[];
  } = { address: '', coordinates: [] };
  items: FoodItemDTO<T>[] = [];
}

export class CreateCartItems extends CreateOrderDTO<Modifier> {
  restaurant_name: string = ''
}

export class Cart {
  cart = new CreateCartItems();
  total_price: number = 0;
}
