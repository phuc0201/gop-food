import { createAction, props } from "@ngrx/store";
import { Campaign } from "../../models/campaign/campain.model";

const GET_ALL = '[campaign] get campaign available for restaurant';
const GET_ALL_SUCCESS = '[campaign] get success';
const GET_ALL_FAILURE = '[campaign] get failed';

export const getCampaignAvailableForRestaurant = createAction(
  GET_ALL,
  props<{ restaurantId: string; }>()
);
export const getAllSuccess = createAction(
  GET_ALL_SUCCESS,
  props<{ campaigns: Campaign[]; }>()
);
export const getAllCampaignFailure = createAction(
  GET_ALL_FAILURE,
  props<{ error: string; }>()
);
