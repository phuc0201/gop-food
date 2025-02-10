import { Component, Input } from '@angular/core';
import { Review } from 'src/app/core/models/review/review.model';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent {
  @Input() review = new Review();
}
