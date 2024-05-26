import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuisineCategory } from 'src/app/core/mock-data/cuisine-category.data';

@Component({
  selector: 'app-cuisines',
  templateUrl: './cuisines.component.html',
  styleUrls: ['./cuisines.component.scss']
})
export class CuisinesComponent implements OnInit {
  listCuisine = [...CuisineCategory];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    let index = this.listCuisine.findIndex(item => this.router.url.includes(item.slug));
    if (index !== -1) {
      const cuisine = this.listCuisine.splice(index, 1)[0];
      this.listCuisine.unshift(cuisine);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }
}
