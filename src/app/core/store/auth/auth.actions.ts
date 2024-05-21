import { createAction, props } from "@ngrx/store";
import { ILoginDTO } from "../../models/auth/auth.model";
import { IToken } from "../../models/common/response-data.model";

export const LOGIN = '[auth] login';
export const LOGIN_SUCCESS = '[auth] login success';
export const LOGIN_FAILURE = '[auth] login failure';


export const loginRequest = createAction(LOGIN, props<{ accCred: ILoginDTO; }>());

export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ token: IToken; }>());

export const loginFailure = createAction(LOGIN_FAILURE, props<{ error: string; }>());


