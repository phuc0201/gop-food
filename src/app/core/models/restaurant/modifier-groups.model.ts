import { IModifier } from "./modifier.mode";
export interface IModifierGroups {
  id: string,
  name: string,
  min: number,
  max: number,
  modifier: IModifier[];
}
