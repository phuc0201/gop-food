import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginState } from "./auth.state";

export const selectLoginState = createFeatureSelector<LoginState>('auth_login');

export const selectToken = createSelector(
  selectLoginState,
  (state) => state.token
);
