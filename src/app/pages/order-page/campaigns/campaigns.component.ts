import { Component, inject } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CampaignCheckbox } from 'src/app/core/models/campaign/campain.model';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
})
export class CampaignsComponent {
  #modal = inject(NzModalRef);
  checkboxes: CampaignCheckbox[] = [
    new CampaignCheckbox('1', false),
    new CampaignCheckbox('2', false),
    new CampaignCheckbox('3', false),
    new CampaignCheckbox('4', false),
    new CampaignCheckbox('5', false),
    new CampaignCheckbox('6', false),
    new CampaignCheckbox('7', false),
  ];

  onCheckboxChange(id: string) {
    const index = this.checkboxes.findIndex(cb =>  cb.id === id)
    this.checkboxes[index].checked = !this.checkboxes[index].checked;
  }

  destroyModal(): void {
    this.#modal.destroy();
  }

  applyPromotion() {
    this.destroyModal();
  }
}
