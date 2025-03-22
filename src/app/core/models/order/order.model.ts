import { BillStatus, OrderStatus, PaymentMethod } from "../common/enums/index.enum";
import { ILocation } from "../geolocation/location.model";
import { FoodItemDTO } from "../restaurant/food-items.model";
import { Modifier } from "../restaurant/modifier.model";

export class Location {
  type: string = 'Point';
  coordinates: number[] = [];
  address: string = '';
}

export class CreateOrderDTO<T> {
  restaurant_id: string = '';
  phone: string = '0987654321';
  payment_method: PaymentMethod = PaymentMethod.COD;
  campaign_ids: string[] = [];
  delivery_location = new Location();
  items: FoodItemDTO<T>[] = [];
}


// export class ItemsDTO {
//   food_id: string = '';
//   quantity: number = 0;
//   price: number = 0;
//   modifiers: string[] = [];
// }

export class CreateCartItems extends CreateOrderDTO<Modifier> {
  restaurant_name: string = '';
  restaurant_location: number[] = [0, 0];
}

export class Basket {
  cart = new CreateCartItems();
  subtotal: number = 0;
}


export class Quote {
  _id: string = '';
  deleted_at: Date | null = null;
  order_type: string = 'DeliveryOrder';
  drivers_reject: string[] = [];
  items: FoodItemDTO<string>[] = [];
  delivery_location = new Location();
  delivery_fare: number = 0;
  order_cost: number = 0;
  distance: number = 0;
  duration: number = 0;
  discount: number = 0;
  total: number = 0;
}

export class Bill {
  _id: string = 'bill_01';
  status: BillStatus = BillStatus.PROGRESSING;
  order?: string = 'order_01';
  payment_method: PaymentMethod = PaymentMethod.COD;
  transaction_id?: string = '';
  campaign_id: string[] = [];
  total: number = 0;
  sub_total: number = 0;
  discount: number = 0;
  platform_fee: number = 2000; //default
}



class OrderHistoryRestaurant {
  _id: string;
  restaurant_name: string;
  cover_image: string;

  constructor(_id: string = '', restaurant_name: string = '', cover_image: string = '') {
    this._id = _id;
    this.restaurant_name = restaurant_name;
    this.cover_image = cover_image;
  }
}

class OrderHistoryItems {
  quantity: number;
  food_name: string;

  constructor(quantity: number, food_name: string) {
    this.quantity = quantity;
    this.food_name = food_name;
  }
}

export class OrderHistory {
  _id: string;
  restaurant: {
    _id: string,
    restaurant_name: string,
    avatar: string,
    status: string;
  };
  bill: Bill;
  items: {
    id: string,
    quantity: number,
    price: number,
    name: string,
    image: string;
  }[];
  delivery_location: ILocation;
  delivery_fare: number;
  order_cost: number;
  confirm_time: Date;
  complete_time: Date;
  order_time: Date;
  order_status: OrderStatus;
  updatedAt: Date;

  constructor(
    _id: string = '',
    restaurant: {
      _id: string,
      restaurant_name: string,
      avatar: string,
      status: string;
    } = {
        _id: '',
        restaurant_name: '',
        avatar: '',
        status: ''
      },
    bill: Bill = new Bill(),
    items: {
      id: string,
      quantity: number,
      price: number,
      name: string,
      image: string;
    }[] = [],
    delivery_location: ILocation = {
      type: '',
      address: '',
      coordinates: []
    },
    delivery_fare: number = 0,
    order_cost: number = 0,
    confirm_time: Date = new Date(),
    complete_time: Date = new Date(),
    order_time: Date = new Date(),
    order_status: OrderStatus = OrderStatus.PENDING_CONFIRM,
    updatedAt: Date = new Date()
  ) {
    this._id = _id;
    this.restaurant = restaurant;
    this.bill = bill;
    this.items = items;
    this.delivery_location = delivery_location;
    this.delivery_fare = delivery_fare;
    this.order_cost = order_cost;
    this.confirm_time = confirm_time;
    this.complete_time = complete_time;
    this.order_time = order_time;
    this.order_status = order_status;
    this.updatedAt = updatedAt;
  }
}

export class UserInfo {
  _id: string;
  avatar: string;
  full_name: string;
  phone: string;

  constructor(_id: string = '', avatar: string = '', full_name: string = '', phone: string = '') {
    this._id = _id;
    this.avatar = avatar;
    this.full_name = full_name;
    this.phone = phone;
  }
}

class FoodDetails {
  name: string;
  image: string;
  price: number;

  constructor(name: string = '', image: string = '', price: number = 0) {
    this.name = name;
    this.image = image;
    this.price = price;
  }
}


export class OrderFoodItems {
  food_id: string;
  quantity: number;
  foodDetails: FoodDetails;
  modifiers: {
    name: string,
    price: number;
  }[];

  constructor(food_id: string = '', quantity: number = 0, foodDetails: FoodDetails = new FoodDetails(), modifiers: {
    name: string,
    price: number;
  }[] = []) {
    this.food_id = food_id;
    this.quantity = quantity;
    this.foodDetails = foodDetails;
    this.modifiers = modifiers;
  }
}


export class OrderDetails {
  _id: string;
  customer: UserInfo;
  restaurant: { _id: string, location: Location; restaurant_name: string; };
  delivery_location: Location;
  order_time: Date;
  confirm_time: Date;
  complete_time: Date;
  order_cost: number;
  delivery_fare: number;
  bill: Bill;
  items: OrderFoodItems[];
  order_status: OrderStatus;

  constructor(
    _id: string = '',
    customer: UserInfo = new UserInfo(),
    restaurant: { _id: string, location: Location; restaurant_name: string; } = { _id: '', location: new Location(), restaurant_name: '' },
    delivery_location: Location = new Location(),
    order_time: Date = new Date(),
    confirm_time: Date = new Date(),
    complete_time: Date = new Date(),
    order_cost: number = 0,
    delivery_fare: number = 0,
    bill: Bill = new Bill(),
    items: OrderFoodItems[] = [],
    order_status: OrderStatus = OrderStatus.PENDING_CONFIRM
  ) {
    this._id = _id;
    this.customer = customer;
    this.restaurant = restaurant;
    this.delivery_location = delivery_location;
    this.order_time = order_time;
    this.confirm_time = confirm_time;
    this.order_cost = order_cost;
    this.delivery_fare = delivery_fare;
    this.bill = bill;
    this.items = items;
    this.complete_time = complete_time;
    this.order_status = order_status;
  }
}



export class OrderTracking {
  _id: string = '';
  state: OrderStatus = OrderStatus.PENDING_CONFIRM;
}
