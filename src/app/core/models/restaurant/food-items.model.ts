export class FoodItems<T> {
  _id: string = '';
  name: string = 'Loading....';
  bio: string = 'Loading....';
  image: string = '';
  price: number = 0;
  modifier_groups: T[] = [];
}


export class FoodItemDTO<T> {
  food_id: string = '';
  food_name?: string = '';
  image?: string = '';
  base_price?: number = 0;
  quantity: number = 0;
  modifiers: T[] = [];
}
