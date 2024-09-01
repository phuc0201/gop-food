export interface IToken {
  accessToken: string;
  refreshToken: string;
}


export interface IPagedResults<T> {
  totalPage: number;
  data: T[];
}
