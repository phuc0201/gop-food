import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileState } from "./profile.state";

export const selectProfileState = createFeatureSelector<ProfileState>('get_profile');

export const selectProfile = createSelector(
  selectProfileState,
  (state) => state
);
