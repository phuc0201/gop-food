export interface IToken {
  accessToken: string;
  refreshToken: string;
}


export interface IPagedResults<T> {
  cuisineId?: string;
  currPage: number;
  totalPage: number;
  data: T[];
}
