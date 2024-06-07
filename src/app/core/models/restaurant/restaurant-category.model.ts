
export class RestaurantCategory<T> {
  _id: string = '';
  name: string = '';
  bio: string = '';
  food_items: T[] = [];
}
