export class CuisineCategory {
  id: string;
  name: string;
  slug: string;
  image: string;

  constructor(
    id: string,
    name: string,
    slug: string,
    image: string
  ) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.image = image;
  }
}
