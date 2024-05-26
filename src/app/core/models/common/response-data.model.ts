import { ILocation } from "../location.model";
export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IRestaurantList {
  count: number,
  items: IRestaurant[];
}

export interface IRestaurant {
  _id: string,
  restaurant_name: string,
  cuisine_categories: string[],
  restaurant_categories: string[],
  status: string,
  bio: string,
  address: string,
  location: ILocation;
  avatar: string,
  cover_image: string,
  distance: number,
  duration: number;
}


export interface IRestaurantInfo {
  _id: string,
  cuisine_categories: string[],
  status: string,
  restaurant_name: string;
  bio: string,
  tier: string,
  location: ILocation,
  avatar: string,
  cover_image: string,
  distance: number,
  duration: number,
  rating: number;
}



// {
//   "_id": "6640631fc9edf07952c1683e",
//   "full_name": "Trịnh Hoàng Phúc",
//   "cuisine_categories": [
//       "BANH_MI",
//       "NOODLES"
//   ],
//   "status": "CLOSED",
//   "restaurant_name": "Bánh Tráng Trộn PinPin",
//   "bio": "say oh yeahhhhhhh",
//   "tier": "STANDARD",
//   "createdAt": "2024-05-12T06:35:11.372Z",
//   "updatedAt": "2024-05-19T07:24:46.809Z",
//   "__v": 0,
//   "location": {
//       "type": "Point",
//       "coordinates": [
//           106.76597508608624,
//           10.851402157771068
//       ]
//   },
//   "avatar": "https://media.be.com.vn/bizops/image/9de765b8-f3b9-11ed-99ae-5e8316b9abf2/original",
//   "distance": 789.3,
//   "duration": 159800,
//   "rating": 4
// }
