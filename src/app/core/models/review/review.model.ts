import { OrderType } from "../../utils/enums/index.enum";

export class Review {
  owner_id: string = '';
  content: string = '';
  type: OrderType = OrderType.DELIVERY;
  rating: number = 0;
  reviewable_id: string = '';
}
