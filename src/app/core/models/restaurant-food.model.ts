import { IPriceOption } from "./price-option.model";
import { IRestaurantFoodReview } from "./restaurant-review.model";

export interface IRestaurantFood {
  name: string
  bio: string
  image: string
  options: IPriceOption[]
  reviews: IRestaurantFoodReview[]
}
