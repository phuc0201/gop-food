import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() {

  }
  constructor() {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'vi');
    }
  }
}
