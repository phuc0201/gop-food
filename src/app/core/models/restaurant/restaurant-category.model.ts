import { IFoodItems } from "./food-items.model";

export interface IRestaurantCategory {
  name: string;
  bio: string;
  food_items: IFoodItems[];
}
