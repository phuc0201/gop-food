import { createAction, props } from "@ngrx/store";
import { IRestaurantInfo, IRestaurantList } from "../../models/common/response-data.model";

export const GET_RESTAURANT_LIST = '[restaurants] get list';
export const GET_RESTAURANT_LIST_SUCCESS = '[restaurants] get success';
export const GET_RESTAURANT_LIST_FAILURE = '[restaurants] get failed';

export const GET_MENU = '[menu] get menu';
export const GET_MENU_SUCCESS = '[menu] get success';
export const GET_MENU_FAILURE = '[menu] get failed';

export const GET_RESTAURANT_INFO = '[restaurant] get restaurant info';
export const GET_RESTAURANT_INFO_SUCCESS = '[restaurant] get success';
export const GET_RESTAURANT_INFO_FAILURE = '[restaurant] get failed';

//
export const getRestaurantList = createAction(
  GET_RESTAURANT_LIST
);

export const getRestaurantListSuccess = createAction(
  GET_RESTAURANT_LIST_SUCCESS,
  props<{ restaurantList: IRestaurantList; }>()
);

export const getRestaurantListFailure = createAction(
  GET_RESTAURANT_LIST_FAILURE,
  props<{ error: string; }>()
);

//

export const getMenu = createAction(
  GET_MENU,
);

export const getMenuSuccess = createAction(
  GET_MENU_SUCCESS,
  props<{ info: IRestaurantInfo; }>() // Nhớ sửa nhé
);

export const getMenuFailure = createAction(
  GET_MENU_FAILURE,
  props<{ error: string; }>()
);

//


export const getRestaurantInfo = createAction(
  GET_RESTAURANT_INFO,
  props<{ res_id: string; }>()
);

export const getRestaurantInfoSuccess = createAction(
  GET_RESTAURANT_INFO_SUCCESS,
  props<{ info: IRestaurantInfo; }>()
);

export const getRestaurantInfoFailure = createAction(
  GET_RESTAURANT_INFO_FAILURE,
  props<{ error: string; }>()
);
