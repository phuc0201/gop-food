import { createAction, props } from "@ngrx/store";
import { IPagedResults } from "../../models/common/response-data.model";
import { ICuisineFilter } from "../../models/restaurant/cuisine-filter.model";
import { FoodItems } from "../../models/restaurant/food-items.model";
import { ModifierGroups } from "../../models/restaurant/modifier-groups.model";
import { RestaurantCategory } from "../../models/restaurant/restaurant-category.model";
import { Restaurant, RestaurantRecommended } from "../../models/restaurant/restaurant.model";

// Action type constants - sử dụng namespace rõ ràng
export const RestaurantActionTypes = {
  // Restaurant list actions
  FETCH_RESTAURANTS: '[Restaurant] Fetch Restaurants',
  FETCH_RESTAURANTS_SUCCESS: '[Restaurant] Fetch Restaurants Success',
  FETCH_RESTAURANTS_FAILURE: '[Restaurant] Fetch Restaurants Failure',

  // Menu actions
  FETCH_MENU: '[Restaurant] Fetch Menu',
  FETCH_MENU_SUCCESS: '[Restaurant] Fetch Menu Success',
  FETCH_MENU_FAILURE: '[Restaurant] Fetch Menu Failure',

  // Restaurant info actions
  FETCH_RESTAURANT_DETAIL: '[Restaurant] Fetch Restaurant Detail',
  FETCH_RESTAURANT_DETAIL_SUCCESS: '[Restaurant] Fetch Restaurant Detail Success',
  FETCH_RESTAURANT_DETAIL_FAILURE: '[Restaurant] Fetch Restaurant Detail Failure',

  // Food details actions
  FETCH_FOOD_DETAIL: '[Restaurant] Fetch Food Detail',
  FETCH_FOOD_DETAIL_SUCCESS: '[Restaurant] Fetch Food Detail Success',
  FETCH_FOOD_DETAIL_FAILURE: '[Restaurant] Fetch Food Detail Failure',
};

// Restaurant List Actions
export const fetchRestaurants = createAction(
  RestaurantActionTypes.FETCH_RESTAURANTS,
  props<{
    cuisineId: string;
    searchQuery: string;
    page: number;
    limit: number;
    filter?: ICuisineFilter;
  }>()
);

export const fetchRestaurantsSuccess = createAction(
  RestaurantActionTypes.FETCH_RESTAURANTS_SUCCESS,
  props<{ payload: IPagedResults<RestaurantRecommended>; }>()
);

export const fetchRestaurantsFailure = createAction(
  RestaurantActionTypes.FETCH_RESTAURANTS_FAILURE,
  props<{ error: string; }>()
);

// Menu Actions
export const fetchMenu = createAction(
  RestaurantActionTypes.FETCH_MENU,
  props<{ restaurantId: string; }>()
);

export const fetchMenuSuccess = createAction(
  RestaurantActionTypes.FETCH_MENU_SUCCESS,
  props<{ payload: RestaurantCategory<FoodItems<string>>[]; }>()
);

export const fetchMenuFailure = createAction(
  RestaurantActionTypes.FETCH_MENU_FAILURE,
  props<{ error: string; }>()
);

// Restaurant Detail Actions
export const fetchRestaurantDetail = createAction(
  RestaurantActionTypes.FETCH_RESTAURANT_DETAIL,
  props<{ restaurantId: string; }>()
);

export const fetchRestaurantDetailSuccess = createAction(
  RestaurantActionTypes.FETCH_RESTAURANT_DETAIL_SUCCESS,
  props<{ payload: Restaurant; }>()
);

export const fetchRestaurantDetailFailure = createAction(
  RestaurantActionTypes.FETCH_RESTAURANT_DETAIL_FAILURE,
  props<{ error: string; }>()
);

// Food Detail Actions
export const fetchFoodDetail = createAction(
  RestaurantActionTypes.FETCH_FOOD_DETAIL,
  props<{ foodId: string; }>()
);

export const fetchFoodDetailSuccess = createAction(
  RestaurantActionTypes.FETCH_FOOD_DETAIL_SUCCESS,
  props<{ payload: FoodItems<ModifierGroups>; }>()
);

export const fetchFoodDetailFailure = createAction(
  RestaurantActionTypes.FETCH_FOOD_DETAIL_FAILURE,
  props<{ error: string; }>()
);
