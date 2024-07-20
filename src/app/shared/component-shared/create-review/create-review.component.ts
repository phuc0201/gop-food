import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { Review } from 'src/app/core/models/review/review.model';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ReviewService } from 'src/app/core/services/review.service';
const plugins = [
  CommonModule,
  NzRateModule,
  FormsModule
];



@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss'],
  standalone: true,
  imports: plugins
})
export class CreateReviewComponent {
  reviewable: {
    title: 'How did you find our delivery service?',
    id: '';
  } = inject(NZ_MODAL_DATA);
  ratingValue: number = 0;
  review = new Review();
  #modal = inject(NzModalRef);

  submitReview() {
    if (this.review.rating > 0) {
      this.review.owner_id = this.profileSrv.getProfileInSession()._id;
      this.review.reviewable_id = this.reviewable.id;
      // this.reviewSrv.createReview(this.review).subscribe();
      this.#modal.close();
    }
  }

  closeModal() {
    this.#modal.close();
  }
  constructor(
    private profileSrv: ProfileService,
    private reviewSrv: ReviewService
  ) { }
}
