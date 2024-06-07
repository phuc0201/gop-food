import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

const pluggins = [
  CommonModule
]
@Component({
  selector: 'app-dots-loader',
  templateUrl: './dots-loader.component.html',
  styleUrls: ['./dots-loader.component.scss'],
  standalone: true,
  imports: pluggins
})
export class DotsLoaderComponent {

}
