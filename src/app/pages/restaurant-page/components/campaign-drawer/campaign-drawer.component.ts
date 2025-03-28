import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { FormatService } from 'src/app/core/services/common/format.serive';
import { selectCampaigns } from 'src/app/core/store/campaign/campaign.selectors';
import { CampaignsState } from 'src/app/core/store/campaign/campaign.state';

@Component({
  selector: 'app-campaign-drawer',
  templateUrl: './campaign-drawer.component.html',
  styleUrls: ['./campaign-drawer.component.scss']
})
export class CampaignDrawerComponent {
  @Input() isVisible: boolean = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  campaigns$ = this.store.select(selectCampaigns).pipe(
    map((state: CampaignsState) => state.campaigns)
  );

  constructor(
    private format: FormatService,
    private store: Store
  ) { }

  closeDrawer() {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }

  formatDate(date: Date): string {
    return this.format.formatDate(date.toString());
  }
}
