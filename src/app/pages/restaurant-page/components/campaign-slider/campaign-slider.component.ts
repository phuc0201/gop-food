import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Campaign } from 'src/app/core/models/campaign/campain.model';
import { FormatService } from 'src/app/core/services/common/format.serive';

@Component({
  selector: 'app-campaign-slider',
  templateUrl: './campaign-slider.component.html',
  styleUrls: ['./campaign-slider.component.scss']
})
export class CampaignSliderComponent implements OnChanges {
  @Input() restaurantId: string = '';
  @Input() campaigns: Campaign[] = [];

  constructor(
    private formatSrv: FormatService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['restaurantId'].currentValue !== '') {
    //   this.campaignSrv.getCampaignsByRestaurantId(this.restaurantId).subscribe({
    //     next: (data) => {
    //       this.campaigns = data;
    //     }
    //   });
    // }
  }

  formatDate(date: Date): string {
    return this.formatSrv.formatDate(date.toString());
  }
}
