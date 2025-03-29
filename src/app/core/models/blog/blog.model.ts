export class Blog {
  id: string;
  image: string;
  title: string;
  description: string;
  link: string;

  constructor(
    id: string = '',
    image: string = '',
    title: string = '',
    description: string = '',
    link: string = ''
  ) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.description = description;
    this.link = link;
  }
}
