import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Blog } from 'src/app/core/models/blog/blog.model';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { HorizontalScrollSliderComponent } from '../horizontal-scroll-slider/horizontal-scroll-slider.component';

const plugins = [
  CommonModule,
  BlogCardComponent,
  HorizontalScrollSliderComponent
];
@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.scss'],
  standalone: true,
  imports: plugins
})
export class ListBlogsComponent {
  blogs: Blog[] = [
    {
      id: '',
      image: 'https://1033609670.rsc.cdn77.org/img_articles/1/1524/thumb/ngOA08Y-665x.jpeg',
      title: "Top tourist attractions you can't miss in Thu Dau Mot, Vietnam",
      description: "Check out our guide to the unique attractions in Thu Dau Mot, and don’t forget to grab a delicious bite to eat after all the fun!",
      link: 'https://restaurantguru.com/guides/top-tourist-attractions-you-cant-miss-in-thu-dau-mot-vietnam'
    },
    {
      id: '',
      image: 'https://1033609670.rsc.cdn77.org/img_articles/1/1396/thumb/e9PP8jn-665x.jpeg',
      title: "Top 5 must-visit restaurants in Ho Chi Minh City, Vietnam",
      description: "Ho Chi Minh City is a vibrant, versatile must-visit on your trip to Vietnam. Discover the best places to eat in Saigon with our guide to its top restaurants.",
      link: 'https://restaurantguru.com/guides/top-5-must-visit-restaurants-in-ho-chi-minh-city-vietnam'
    },
    {
      id: '',
      image: 'https://1033609670.rsc.cdn77.org/img_articles/1/1327/thumb/kNFRrZ4g-665x.jpeg',
      title: "What to do and where to eat in Hanoi, Vietnam",
      description: "Discover the best activities and top dining spots in vibrant Hanoi city. From exploring beautiful temples to savoring ice cream, our guide covers it all for an unforgettable trip.",
      link: 'https://restaurantguru.com/guides/what-to-do-and-where-to-eat-in-hanoi-vietnam'
    },
    {
      id: '',
      image: 'https://1033609670.rsc.cdn77.org/img_articles/1/1292/thumb/fZVq6o-665x.jpeg',
      title: 'Top 5 restaurants in Da Nang, Vietnam',
      description: "Da Nang is a popular destination for Vietnamese vacations. To make your trip smoother, check out our guide to the best restaurants in the city.",
      link: 'https://restaurantguru.com/guides/top-5-restaurants-in-da-nang-vietnam'
    },
    {
      id: '',
      image: 'https://1033609670.rsc.cdn77.org/img_articles/1/1286/thumb/1UtFjXnd-665x.jpeg',
      title: "Best local dishes for you to eat in Ho Chi Minh City, Vietnam",
      description: "Get ready to discover Saigon's most legendary dishes and the ultimate dining spots you simply can't miss out on.",
      link: 'https://restaurantguru.com/guides/best-local-dishes-for-you-to-eat-in-ho-chi-minh-city-vietnam'
    },
    {
      id: '',
      image: 'https://1033609670.rsc.cdn77.org/img_articles/1/1274/thumb/GRapfstZ-665x.jpeg',
      title: "Best things to do & to eat in Ho Chi Minh City, Vietnam",
      description: "Planning a trip to Ho Chi Minh City? Check out our guide to must-visit attractions and top restaurants to savor local food for your ideal itinerary.",
      link: 'https://restaurantguru.com/guides/best-things-to-do-to-eat-in-ho-chi-minh-city-vietnam'
    }
  ];

}
