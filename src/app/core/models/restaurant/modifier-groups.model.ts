import { Modifier } from "./modifier.model";

export class ModifierGroups {
  _id: string = '';
  name: string = '';
  min: number = 0;
  max: number = 1;
  modifier: Modifier[] = [];
}
