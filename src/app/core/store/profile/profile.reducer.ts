import { createReducer, on } from "@ngrx/store";
import * as profileAction from './profile.action';
import { inititalProfileState } from "./profile.state";
const _getProfileReducer = createReducer(
  inititalProfileState,
  on(profileAction.getProfile, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),

  on(profileAction.getProfileSuccess, (state, { profile }) => {
    return {
      ...state,
      profile: profile
    };
  }),

  on(profileAction.getProfileFailure, (state, { error }) => {
    return {
      ...state,
      error: error
    };
  })
);

export function getProfileReducer(state: any, action: any) {
  return _getProfileReducer(state, action);
}
