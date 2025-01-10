import { CuisineCategory } from "../../models/cuisine/cuisine-category.model";

export interface CuisinesState {
  result: CuisineCategory[];
  error: string;
  isLoading: boolean;
}

export const initialCuisinesState: CuisinesState = {
  result: [],
  error: '',
  isLoading: false
};
