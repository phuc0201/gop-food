import { IRestaurantInfo, IRestaurantList } from "../../models/common/response-data.model";

export interface RestaurantListSate {
  restaurants: IRestaurantList,
  error: string,
  isLoading: boolean;
}

export interface RestaurantInfoState {
  restaurant: IRestaurantInfo,
  error: string,
  isLoading: boolean;
}

export const initialRestaurantListSate: RestaurantListSate = {
  restaurants: {
    count: 0,
    items: []
  },
  error: '',
  isLoading: false
};

export const initialRestaurantInfo: RestaurantInfoState = {
  restaurant: {
    _id: '',
    cuisine_categories: [],
    status: '',
    restaurant_name: '',
    bio: '',
    tier: '',
    location: {
      type: 'Point',
      coordinates: []
    },
    avatar: '',
    cover_image: '',
    distance: 0,
    duration: 0,
    rating: 0
  },
  error: '',
  isLoading: false
};
