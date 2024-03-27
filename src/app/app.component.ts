import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    initFlowbite();
  }
  constructor() {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'vi');
    }
  }
}
