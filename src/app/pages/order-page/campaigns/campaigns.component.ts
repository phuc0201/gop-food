import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs';
import { Campaign } from 'src/app/core/models/campaign/campain.model';
import { Cart } from 'src/app/core/models/order/order.model';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { FormatService } from 'src/app/core/services/common/format.serive';
import { OrderService } from 'src/app/core/services/order.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { selectCampaigns } from 'src/app/core/store/campaign/campaign.selectors';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
})
export class CampaignsComponent implements OnInit {
  #modal = inject(NzModalRef);
  campaigns: Campaign[] = [];
  campainsSelected: string[] = [];
  basket = new Cart();

  selectPromotion(id: string) {
    const index = this.campaigns.findIndex(cp => cp._id === id);
    if (index !== -1) {
      const currentCampaign = this.campaigns[index];

      if (!currentCampaign.checked) {
        const sameDiscountTypeExists = this.campaigns.some(
          cp => cp.discount.type === currentCampaign.discount.type && cp._id !== id && cp.checked
        );
        const isValidCampaign = this.campaignSrv.isValidCampaign(this.profileSrv.getProfileInSession()._id, currentCampaign, this.basket.subtotal);
        if (!sameDiscountTypeExists && isValidCampaign) {
          this.campainsSelected.push(currentCampaign._id);
          currentCampaign.checked = true;
          this.campaigns.forEach(cp => {
            if (cp._id !== id && cp.discount.type === currentCampaign.discount.type) {
              cp.disabled = true;
            }
          });
        }
      } else {
        const index = this.campainsSelected.findIndex(cp => cp == currentCampaign._id);
        this.campainsSelected.splice(index, 1);
        currentCampaign.checked = false;
        this.campaigns.forEach(cp => {
          if (cp.discount.type === currentCampaign.discount.type) {
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
    this.#modal.close(this.campainsSelected);
  }

  formatDate(isoDate: string): string {
    return this.formatSrv.formatDate(isoDate);
  }

  ngOnInit(): void {
    this.basket = this.orderSrv.getCartItems();
    this.campainsSelected = this.basket.cart.campaign_ids;
    const fetchCampaign = this.store.select(selectCampaigns)
      .pipe(
        filter(data => data.campaigns.length > 0)
      )
      .subscribe({
        next: data => {
          const cmp = data.campaigns.filter(cmp => cmp.restaurant_id == this.basket.cart.restaurant_id || cmp.restaurant_id == null);
          this.campaigns = cmp.map(campaign => {
            const isValidCampaign = this.campaignSrv.isValidCampaign(this.profileSrv.getProfileInSession()._id, campaign, this.basket.subtotal);
            return {
              ...campaign,
              checked: this.basket.cart.campaign_ids.findIndex(id => campaign._id == id) !== -1,
              disabled: !isValidCampaign
            };
          });
        },
        complete: () => {
          fetchCampaign.unsubscribe();
        }
      });
  }

  constructor(
    private store: Store,
    private formatSrv: FormatService,
    private profileSrv: ProfileService,
    private orderSrv: OrderService,
    private campaignSrv: CampaignService
  ) { }
}
