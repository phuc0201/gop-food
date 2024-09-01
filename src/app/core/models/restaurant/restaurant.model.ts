import { ILocation } from "../geolocation/location.model";

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

export class RestaurantRecommended {
  _id: string;
  restaurant_name: string;
  cuisine_categories: string[];
  avatar: string;
  rating: number;
  distance: number;
  duration: number;
  campaign_count: number;
  items: any;
  count: any;

  constructor(
    _id: string = '',
    restaurant_name: string = '',
    cuisine_categories: string[] = [],
    avatar: string = '',
    rating: number = 0,
    distance: number = 0,
    duration: number = 0,
    campaign_count: number = 0
  ) {
    this._id = _id;
    this.restaurant_name = restaurant_name;
    this.cuisine_categories = cuisine_categories;
    this.avatar = avatar;
    this.rating = rating;
    this.distance = distance;
    this.duration = duration;
    this.campaign_count = campaign_count;
  }
}
