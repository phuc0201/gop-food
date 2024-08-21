import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

const plugins = [
  CommonModule
];
@Component({
  selector: 'app-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss'],
  standalone: true,
  imports: plugins
})
export class NoResultsComponent {

}
