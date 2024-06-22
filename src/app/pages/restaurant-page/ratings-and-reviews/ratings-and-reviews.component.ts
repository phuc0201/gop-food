import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Restaurant } from 'src/app/core/models/restaurant/restaurant.model';
import { CreateReviewComponent } from 'src/app/shared/component-shared/create-review/create-review.component';

@Component({
  selector: 'app-ratings-and-reviews',
  templateUrl: './ratings-and-reviews.component.html',
  styleUrls: ['./ratings-and-reviews.component.scss']
})
export class RatingsAndReviewsComponent implements OnInit {
  @Input() opened: boolean = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Input() restaurant = new Restaurant();
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

  ngOnInit(): void {

  }
  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
  ) { }

}
