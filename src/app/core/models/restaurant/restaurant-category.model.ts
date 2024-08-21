
export class RestaurantCategory<T> {
  _id: string = '';
  name: string = '';
  bio: string = '';
  image: string = '';
  food_items: T[] = [];
}


export class CategorySlider {
  _id: string;
  name: string;
  image: string;

  constructor(
    _id: string = '',
    name: string = '',
    image: string = '',
  ) {
    this._id = _id;
    this.name = name;
    this.image = image;
  }
}


export class Category {
  type: string;
  name: string;
  slug: string;
  img: string;

  constructor(
    type: string = '',
    name: string = '',
    slug: string = '',
    img: string
  ) {
    this.type = type;
    this.name = name;
    this.slug = slug;
    this.img = img;
  }
}
