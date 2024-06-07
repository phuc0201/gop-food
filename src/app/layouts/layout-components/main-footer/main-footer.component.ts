import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

const plugins = [
  CommonModule
]
@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
  standalone: true,
  imports: plugins
})
export class MainFooterComponent implements OnInit {

  ngOnInit(): void {
  }
}
