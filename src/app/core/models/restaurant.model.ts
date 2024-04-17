import { ICategory } from "./category.model";

export interface IRestaurant {
  id: string,
  cuisine_categories: string[],
  restaurant_categories: ICategory[],
  status: string,
  restaurant_profile: string,
  bio: string,
  address: string,
  name: string,
  review: string, // bo sung sau
  avatar: string,
  cover_image: string,
}
