import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Restaurant } from 'src/app/core/models/restaurant/restaurant.model';


@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.scss']
})
export class RestaurantInfoComponent implements OnInit, OnChanges {
  isMobile: boolean = false;
  @Input() isLoading: boolean = true;
  @Input() restaurant = new Restaurant();
  distance: number = 0;
  duration: string = '';
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    } else this.isMobile = false;
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurant']) {
      if (this.restaurant.distance && this.restaurant.duration) {
        this.distance = parseFloat((this.restaurant.distance / 1000).toFixed(2));
        let duration = parseFloat((this.restaurant.duration / 60000).toFixed(0));

        this.duration = duration < 60 ? duration + 'm' : (parseFloat((duration / 60).toFixed(0)) + 'h');
      }
    }
  }

  constructor() { }
}
