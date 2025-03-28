import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { FormatService } from 'src/app/core/services/common/format.serive';
import { selectCampaigns } from 'src/app/core/store/campaign/campaign.selectors';
import { CampaignsState } from 'src/app/core/store/campaign/campaign.state';

@Component({
  selector: 'app-campaign-slider',
  templateUrl: './campaign-slider.component.html',
  styleUrls: ['./campaign-slider.component.scss']
})
export class CampaignSliderComponent {
  @Input() restaurantId: string = '';
  campaigns$ = this.store.select(selectCampaigns).pipe(
    map((state: CampaignsState) => state.campaigns)
  );

  constructor(
    private formatSrv: FormatService,
    private store: Store
  ) { }

  formatDate(date: Date): string {
    return this.formatSrv.formatDate(date.toString());
  }
}
