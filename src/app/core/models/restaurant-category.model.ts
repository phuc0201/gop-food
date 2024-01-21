import { IPriceOption } from "./price-option.model";
import { IRestaurantFood } from "./restaurant-food.model";

export interface IRestaurantCategory {
  name: string
  image: string
  bio: string
  options: IPriceOption[]
  food_items: IRestaurantFood[]
}
