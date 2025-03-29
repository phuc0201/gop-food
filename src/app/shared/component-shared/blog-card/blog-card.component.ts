import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Blog } from 'src/app/core/models/blog/blog.model';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class BlogCardComponent {
  @Input() blog = new Blog();
}
