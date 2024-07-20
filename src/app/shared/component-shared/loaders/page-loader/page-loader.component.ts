import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

const plugins = [
  CommonModule
];
@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss'],
  standalone: true,
  imports: plugins
})
export class PageLoaderComponent implements OnInit {
  @Input() isLoading: boolean = true;

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 1600);
  }
}
