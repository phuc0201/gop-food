import { ILocation } from "../geolocation/location.model";

export class Restaurant {
  _id: string = '';
  restaurant_name: string = '';
  cuisine_categories: string[] = [];
  restaurant_categories: string[] = [];
  status: string = '';
  bio: string = '';
  tier: string = '';
  location: ILocation = {
    type: 'Point',
    coordinates: [0, 0],
    address: ''
  };
  avatar: string = '';
  cover_image: string = '';
  distance?: number = 0;
  duration?: number = 0;
  rating?: number = 0;
  constructor() { }
}

export class RestaurantRecommended {
  id: string;
  restaurant_name: string;
  location?: ILocation;
  cuisine_categories: string[];
  avatar: string;
  rating: number;
  distance: number;
  duration: number;
  hasCampaign: boolean;
  isClosed?: boolean;
  items?: any;
  count?: any;

  constructor(
    id: string = '',
    restaurant_name: string = '',
    cuisine_categories: string[] = [],
    avatar: string = '',
    rating: number = 0,
    distance: number = 0,
    duration: number = 0,
    hasCampaign: boolean = false,
    location?: ILocation,
    isClosed?: boolean
  ) {
    this.id = id;
    this.restaurant_name = restaurant_name;
    this.cuisine_categories = cuisine_categories;
    this.avatar = avatar;
    this.rating = rating;
    this.distance = distance;
    this.duration = duration;
    this.hasCampaign = hasCampaign;
    this.location = location;
    this.isClosed = isClosed;
  }
}
