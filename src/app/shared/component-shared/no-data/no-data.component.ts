import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

const plugins = [
  CommonModule
]
@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
  standalone: true,
  imports: plugins
})
export class NoDataComponent {
  @Input() isShow: boolean = false;
}
