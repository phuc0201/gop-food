import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

const plugins = [
  CommonModule
]
@Component({
  selector: 'dot-spinner',
  templateUrl: './dot-spinner.component.html',
  styleUrls: ['./dot-spinner.component.scss'],
  standalone: true,
  imports: plugins
})
export class DotSpinnerComponent {
  @Input() size: string = '1.3rem';
  @Input() speed: string = '0.5s';
  @Input() color: string = '#615d5d';
}
