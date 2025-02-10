import { Component, EventEmitter, HostListener, Input, Output, SimpleChanges } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { Restaurant } from 'src/app/core/models/restaurant/restaurant.model';
import { Review } from 'src/app/core/models/review/review.model';
import { FormatService } from 'src/app/core/services/common/format.serive';
import { ReviewService } from 'src/app/core/services/review.service';

@Component({
  selector: 'app-review-drawer',
  templateUrl: './review-drawer.component.html',
  styleUrls: ['./review-drawer.component.scss']
})
export class ReviewDrawerComponent {
  @Input() opened: boolean = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Input() restaurant = new Restaurant();
  @Input() reviews: Review[] = [];
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


  loadReviews(): void {
    this.reviewSrv.getReviews(this.restaurant._id).subscribe(data => {
      this.reviews = data;
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
    this.checkMobileScreen();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes["restaurant"] && changes["restaurant"].currentValue._id !== '')) {
      this.loadReviews();
    }
  }

  constructor(
    private reviewSrv: ReviewService,
    private formatService: FormatService,
  ) { }
}
