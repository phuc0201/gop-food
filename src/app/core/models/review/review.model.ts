import { OrderType } from "../../utils/enums/index.enum";

export class Review {
  owner_id: string = '';
  content: string = '';
  type: OrderType = OrderType.DELIVERY;
  rating: number = 0;
  reviewable_id: string = '';
  createdAt?: string;
  updatedAt?: string;
  customer?: {
    _id: string;
    full_name: string;
    avatar: string;
  };
}


export class ReviewFoodItem {
  owner_id?: string = '';
  content: string = '';
  rating: number = 0;
  createdAt: string = '';
  customerInfo?: CustomerInfo;
}

export class ReviewDTO {
  reviewable_id: string = '';
  owner_id: string = '';
  content: string = '';
  rating: number = 0;
}

class CustomerInfo {
  _id: string = '';
  full_name: string = '';
  avatar: string = '';
}
