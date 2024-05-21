import { IToken } from "../../models/common/response-data.model";

export interface LoginState {
  token: IToken;
  error?: string;
  isLoading: boolean;
}

export const initialLoginState: LoginState = {
  token: {
    accessToken: '',
    refreshToken: ''
  },
  error: '',
  isLoading: false
};
