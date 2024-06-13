import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs';
import { Campaign } from 'src/app/core/models/campaign/campain.model';
import { FormatService } from 'src/app/core/services/common/format.serive';
import { OrderService } from 'src/app/core/services/order.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { getAllCampaign } from 'src/app/core/store/campaign/campaign.actions';
import { selectCampaigns } from 'src/app/core/store/campaign/campaign.selectors';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
})
export class CampaignsComponent implements OnInit{
  #modal = inject(NzModalRef);
  campaigns: Campaign[] = [];
  campainsSelected: string[] = [];

  selectPromotion(id: string) {
    const index = this.campaigns.findIndex(cp =>  cp._id === id)
    if (index !== -1) {
      const currentCampaign = this.campaigns[index];

      if (!currentCampaign.checked) {
        const sameDiscountTypeExists = this.campaigns.some(
          cp => cp.discount.type === currentCampaign.discount.type && cp._id !== id && cp.checked
        );
        const isPromoQuotaUsed = currentCampaign.unavailable_users.filter(id => id == this.profileSrv.getCustomerProfile()._id ).length >= currentCampaign.quotas.total_count_per_count
        if (!sameDiscountTypeExists && !isPromoQuotaUsed) {
          this.campainsSelected.push(currentCampaign._id);
          currentCampaign.checked = true;
          this.campaigns.forEach(cp => {
            if (cp._id !== id && cp.discount.type === currentCampaign.discount.type) {
              cp.disabled = true;
            }
          });
        }
      } else {
        const index = this.campainsSelected.findIndex(cp => cp == currentCampaign._id)
        this.campainsSelected.splice(index, 1)
        currentCampaign.checked = false;
        this.campaigns.forEach(cp => {
          if(cp.discount.type === currentCampaign.discount.type) {
            cp.disabled = false;
          }
        });
      }
    }
  }

  destroyModal(): void {
    this.#modal.destroy();
  }

  applyPromotion() {
    this.#modal.close(this.campainsSelected)
  }

  formatDate(isoDate: string): string {
    return this.formatSrv.formatDate(isoDate);
  }

  ngOnInit(): void {
    const basket = this.orderSrv.getCartItems();
    this.store.dispatch(getAllCampaign())
    const fetchCampaign = this.store.select(selectCampaigns)
    .pipe(
      filter(data => data.campaigns.length > 0)
    )
    .subscribe({
      next: data => {
        this.campaigns = data.campaigns.map(campaign => {
          const isPromoQuotaUsed = campaign.unavailable_users.filter(id => id == this.profileSrv.getCustomerProfile()._id ).length >= campaign.quotas.total_count_per_count
          return {
            ...campaign,
            checked: basket.cart.campaign_id.findIndex(id => campaign._id == id) !== -1,
            disabled: isPromoQuotaUsed
          }
        });
      },
      complete: () => {
        fetchCampaign.unsubscribe()
      }
    })
  }

  constructor(
    private store: Store,
    private formatSrv: FormatService,
    private profileSrv: ProfileService,
    private orderSrv: OrderService
  ){}
}
