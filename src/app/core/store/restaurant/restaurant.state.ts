import { IPagedResults } from "../../models/common/response-data.model";
import { FoodItems } from "../../models/restaurant/food-items.model";
import { ModifierGroups } from "../../models/restaurant/modifier-groups.model";
import { RestaurantCategory } from "../../models/restaurant/restaurant-category.model";
import { Restaurant, RestaurantRecommended } from "../../models/restaurant/restaurant.model";

export interface RestaurantListSate {
  result: IPagedResults<RestaurantRecommended>,
  error: string,
  isLoading: boolean;
}

export interface RestaurantInfoState {
  restaurant: Restaurant,
  error: string,
  isLoading: boolean;
}


export interface MenuState {
  menu: RestaurantCategory<FoodItems<string>>[],
  error: string,
  isLoading: boolean;
}

export interface FoodDetailsState {
  foodDetails: FoodItems<ModifierGroups>;
  error: string,
  isLoading: boolean;
}
//

export const initialMenuState: MenuState = {
  menu: [],
  error: '',
  isLoading: false
};
export const initialRestaurantListSate: RestaurantListSate = {
  result: {
    totalPage: 0,
    data: []
  },
  error: '',
  isLoading: false
};

export const initialRestaurantInfo: RestaurantInfoState = {
  restaurant: new Restaurant(),
  error: '',
  isLoading: false
};


export const initialFoodDetails: FoodDetailsState = {
  foodDetails: new FoodItems<ModifierGroups>(),
  error: '',
  isLoading: false
};
