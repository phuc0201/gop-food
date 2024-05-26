import { IModifierGroups } from "./modifier-groups.model";

export interface IFoodItems {
  id: string,
  name: string,
  bio: string,
  image: string,
  price: number,
  modifier_groups: IModifierGroups[];
}
