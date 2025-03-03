import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  ngOnInit(): void {
    window.scroll({
      top: 0,
      behavior: 'instant'
    });
  }
}
