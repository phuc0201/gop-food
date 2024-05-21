import { createReducer, on } from "@ngrx/store";
import * as authActions from './auth.actions';
import { initialLoginState } from "./auth.state";
const _loginReducer = createReducer(
  initialLoginState,
  on(authActions.loginSuccess, (state, { token }) => {
    return {
      ...state,
      token: token,
      isLoading: true
    };
  }),
  on(authActions.loginFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),
);
export function loginReducer(state: any, action: any) {
  return _loginReducer(state, action);
}
