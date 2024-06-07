import { ILocation } from "../location.model";

export class Restaurant {
  _id: string = '';
  restaurant_name: string = '';
  cuisine_categories: string[] = [];
  restaurant_categories: string[] = [];
  status: string = '';
  bio: string = '';
  address: string = '';
  tier: string = '';
  location: ILocation = {
    type: 'Point',
    coordinates: [0, 0]
  };
  avatar: string = '';
  cover_image: string = '';
  distance?: number = 0;
  duration?: number = 0;
  rating?: number = 0;
  constructor() { }
}

export class RestaurantsRecommended {
  count: number = 0;
  items: Restaurant[] = [];
  constructor() { }
}
