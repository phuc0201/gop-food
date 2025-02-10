import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Campaign } from 'src/app/core/models/campaign/campain.model';
import { FormatService } from 'src/app/core/services/common/format.serive';

@Component({
  selector: 'app-campaign-drawer',
  templateUrl: './campaign-drawer.component.html',
  styleUrls: ['./campaign-drawer.component.scss']
})
export class CampaignDrawerComponent {
  @Input() isVisible: boolean = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Input() campaigns: Campaign[] = [];

  constructor(
    private format: FormatService
  ) { }

  closeDrawer() {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }

  formatDate(date: Date): string {
    return this.format.formatDate(date.toString());
  }
}
