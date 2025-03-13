import { IPagedResults } from "../../models/common/response-data.model";
import { FoodItems } from "../../models/restaurant/food-items.model";
import { ModifierGroups } from "../../models/restaurant/modifier-groups.model";
import { RestaurantCategory } from "../../models/restaurant/restaurant-category.model";
import { Restaurant, RestaurantRecommended } from "../../models/restaurant/restaurant.model";

export interface RestaurantsState {
  restaurants: IPagedResults<RestaurantRecommended>;
  error: string | null;
  loading: boolean;
}

export interface RestaurantDetailState {
  restaurant: Restaurant;
  error: string | null;
  loading: boolean;
}

export interface MenuState {
  items: RestaurantCategory<FoodItems<string>>[];
  error: string | null;
  loading: boolean;
}

export interface FoodDetailState {
  food: FoodItems<ModifierGroups>;
  error: string | null;
  loading: boolean;
}

export const initialRestaurantsState: RestaurantsState = {
  restaurants: {
    currPage: 1,
    totalPage: 0,
    data: []
  },
  error: null,
  loading: false
};

export const initialRestaurantDetailState: RestaurantDetailState = {
  restaurant: new Restaurant(),
  error: null,
  loading: false
};

export const initialMenuState: MenuState = {
  items: [],
  error: null,
  loading: false
};

export const initialFoodDetailState: FoodDetailState = {
  food: new FoodItems<ModifierGroups>(),
  error: null,
  loading: false
};
