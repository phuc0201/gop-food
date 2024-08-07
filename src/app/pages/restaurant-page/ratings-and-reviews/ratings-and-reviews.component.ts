import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewContainerRef } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Restaurant } from 'src/app/core/models/restaurant/restaurant.model';
import { Review } from 'src/app/core/models/review/review.model';
import { FormatService } from 'src/app/core/services/common/format.serive';
import { ReviewService } from 'src/app/core/services/review.service';
import { CreateReviewComponent } from 'src/app/shared/component-shared/create-review/create-review.component';

@Component({
  selector: 'app-ratings-and-reviews',
  templateUrl: './ratings-and-reviews.component.html',
  styleUrls: ['./ratings-and-reviews.component.scss']
})
export class RatingsAndReviewsComponent implements OnInit, OnChanges {
  @Input() opened: boolean = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Input() restaurant = new Restaurant();
  reviews: Review[] = [];
  placementDrawer: NzDrawerPlacement = 'right';
  isLoading: boolean = false;


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobileScreen();
  }

  checkMobileScreen(): void {
    if (window.innerWidth <= 768) {
      this.placementDrawer = 'bottom';
    }
    else this.placementDrawer = 'right';
  }

  createReviewModal() {
    return this.modal.create<CreateReviewComponent, { title: string, id: string; }>({
      nzContent: CreateReviewComponent,
      nzClosable: false,
      nzWrapClassName: 'review-modal',
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
      nzData: {
        title: 'How was your food at ' + this.restaurant.restaurant_name,
        id: this.restaurant._id
      }
    });
  }

  closeDrawer(): void {
    this.opened = false;
    this.openedChange.emit(this.opened);
  }

  formatDate(date: string): string {
    return this.formatService.formatDate(date);
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["restaurant"] && !changes["restaurant"].firstChange) {
      this.reviewSrv.getReviews(this.restaurant._id).subscribe(data => {
        this.reviews = data;
      });
    }
  }

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private reviewSrv: ReviewService,
    private formatService: FormatService,
  ) { }

}
