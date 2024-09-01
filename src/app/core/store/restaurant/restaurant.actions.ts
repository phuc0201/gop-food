import { createAction, props } from "@ngrx/store";
import { IPagedResults } from "../../models/common/response-data.model";
import { FoodItems } from "../../models/restaurant/food-items.model";
import { ModifierGroups } from "../../models/restaurant/modifier-groups.model";
import { RestaurantCategory } from "../../models/restaurant/restaurant-category.model";
import { Restaurant, RestaurantRecommended } from "../../models/restaurant/restaurant.model";

export const GET_RESTAURANT_LIST = '[restaurants] get list';
export const GET_RESTAURANT_LIST_SUCCESS = '[restaurants] get success';
export const GET_RESTAURANT_LIST_FAILURE = '[restaurants] get failed';

export const GET_MENU = '[menu] get menu';
export const GET_MENU_SUCCESS = '[menu] get success';
export const GET_MENU_FAILURE = '[menu] get failed';

export const GET_RESTAURANT_INFO = '[restaurant] get restaurant info';
export const GET_RESTAURANT_INFO_SUCCESS = '[restaurant] get info success';
export const GET_RESTAURANT_INFO_FAILURE = '[restaurant] get info failed';

export const GET_FOOD_DETAILS = '[food] get food details';
export const GET_FOOD_DETAILS_SUCCESS = '[food] get success';
export const GET_FOOD_DETAILS_FAILURE = '[food] get failed';

// RECOMMENDED //
export const getRestaurantList = createAction(
  GET_RESTAURANT_LIST,
  props<{
    categoryId: string;
    searchQuery: string;
    page: number;
    limit: number;
  }>()
);

export const getRestaurantListSuccess = createAction(
  GET_RESTAURANT_LIST_SUCCESS,
  props<{ result: IPagedResults<RestaurantRecommended>; }>()
);

export const getRestaurantListFailure = createAction(
  GET_RESTAURANT_LIST_FAILURE,
  props<{ error: string; }>()
);

// MENU //
export const getMenu = createAction(
  GET_MENU,
  props<{ id: string; }>()
);

export const getMenuSuccess = createAction(
  GET_MENU_SUCCESS,
  props<{ menu: RestaurantCategory<FoodItems<string>>[]; }>()
);

export const getMenuFailure = createAction(
  GET_MENU_FAILURE,
  props<{ error: string; }>()
);

// INFO //
export const getRestaurantInfo = createAction(
  GET_RESTAURANT_INFO,
  props<{ res_id: string; }>()
);

export const getRestaurantInfoSuccess = createAction(
  GET_RESTAURANT_INFO_SUCCESS,
  props<{ info: Restaurant; }>()
);

export const getRestaurantInfoFailure = createAction(
  GET_RESTAURANT_INFO_FAILURE,
  props<{ error: string; }>()
);


// FOOD DETAIL //
export const getFoodDetails = createAction(
  GET_FOOD_DETAILS,
  props<{ id: string; }>()
);

export const getFoodDetailsSuccess = createAction(
  GET_FOOD_DETAILS_SUCCESS,
  props<{ foodDetails: FoodItems<ModifierGroups>; }>()
);

export const getFoodDetailsFailure = createAction(
  GET_FOOD_DETAILS_FAILURE,
  props<{ error: string; }>()
);
