import { IItems } from "./items.model";

export interface ICategory {
  id: string,
  name: string,
  bio: string,
  food_items: IItems[];
}
