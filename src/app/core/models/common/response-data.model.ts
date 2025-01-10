export interface IToken {
  accessToken: string;
  refreshToken: string;
}


export interface IPagedResults<T> {
  currPage: number;
  totalPage: number;
  data: T[];
}
