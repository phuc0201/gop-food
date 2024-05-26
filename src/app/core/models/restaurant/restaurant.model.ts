import { ILocation } from "../location.model";
import { IRestaurantCategory } from "./restaurant-category.model";

export interface IRestaurant {
  id: string,
  restaurant_name: string,
  cuisine_categories: string[],
  restaurant_categories: IRestaurantCategory[],
  status: string,
  bio: string,
  address: string,
  location: ILocation;
  avatar: string,
  cover_image: string,
}
