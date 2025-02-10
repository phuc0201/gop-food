import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

const plugins = [
  CommonModule
];

@Component({
  selector: 'app-horizontal-scroll-slider',
  templateUrl: './horizontal-scroll-slider.component.html',
  styleUrls: ['./horizontal-scroll-slider.component.scss'],
  standalone: true,
  imports: plugins
})
export class HorizontalScrollSliderComponent {
  @ViewChild('horizontalSlider') horizontalSlider!: ElementRef;
  @Input() isDisplayButton: boolean = false;

  scrollLeft(): void {
    const list = this.horizontalSlider.nativeElement;
    const itemWidth = list.children[0].offsetWidth * 2;
    list.scrollBy({ left: - itemWidth, behavior: 'smooth' });
  }

  scrollRight(): void {
    const list = this.horizontalSlider.nativeElement;
    const itemWidth = list.children[0].offsetWidth * 2;
    list.scrollBy({ left: itemWidth, behavior: 'smooth' });
  }
}
