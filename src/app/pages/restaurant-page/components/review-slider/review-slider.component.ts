import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Review } from 'src/app/core/models/review/review.model';
import { ReviewService } from 'src/app/core/services/review.service';

@Component({
  selector: 'app-review-slider',
  templateUrl: './review-slider.component.html',
  styleUrls: ['./review-slider.component.scss']
})
export class ReviewSliderComponent implements OnInit, OnChanges {
  @Input() restaurantId: string = '';
  reviews: Review[] = [];
  isOpenReviewsDrawer: boolean = false;

  constructor(
    private reviewSrv: ReviewService,
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurantId'] && changes['restaurantId'].currentValue !== '') {
      this.reviewSrv.getReviews(this.restaurantId).subscribe({
        next: (data) => {
          this.reviews = data;
        }
      });
    }
  }
}
