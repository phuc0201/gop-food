import { createAction, props } from "@ngrx/store";
import { IProfile } from "../../models/profile/profile.model";

export const GET_PROFILE = '[profile] get profile';
export const GET_PROFILE_SUCCESS = '[profile] get success';
export const GET_PROFILE_FAILURE = '[profile] failed';

export const getProfile = createAction(
  GET_PROFILE
);

export const getProfileSuccess = createAction(
  GET_PROFILE_SUCCESS,
  props<{ profile: IProfile; }>()
);

export const getProfileFailure = createAction(
  GET_PROFILE_FAILURE,
  props<{ error: string; }>()
);
