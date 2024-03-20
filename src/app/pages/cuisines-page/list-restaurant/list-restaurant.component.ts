import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.scss'],
})
export class ListRestaurantComponent implements OnInit {

  slug: string = '';
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params["slug"];
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });
    this.route.queryParams.subscribe(params => {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });
  }
}
