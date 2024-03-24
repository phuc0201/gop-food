export interface ICuisineFilter {
  sortBy: string,
  promo: boolean,
  deliveryFee: number,
  price: {
    min: number,
    max: number;
  },
}
