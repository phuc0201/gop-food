import { createAction, props } from "@ngrx/store";
import { Campaign } from "../../models/campaign/campain.model";

const GET_ALL = '[campain] get all';
const GET_ALL_SUCCESS = '[campaign] get all success';
const GET_ALL_FAILURE = '[campaign] get all failed';

export const getAllCampaign = createAction(
  GET_ALL
)
export const  getAllSuccess = createAction(
  GET_ALL_SUCCESS,
  props<{ campaigns: Campaign[] }>()
)
export const getAllCampaignFailure = createAction(
  GET_ALL_FAILURE,
  props<{ error: string }>()
)
