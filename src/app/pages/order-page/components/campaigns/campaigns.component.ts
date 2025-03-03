import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs';
import { Campaign } from 'src/app/core/models/campaign/campain.model';
import { CampaignDiscountType } from 'src/app/core/models/common/enums/index.enum';
import { Basket } from 'src/app/core/models/order/order.model';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { FormatService } from 'src/app/core/services/common/format.serive';
import { OrderService } from 'src/app/core/services/order.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { selectCampaigns } from 'src/app/core/store/campaign/campaign.selector';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
})
export class CampaignsComponent implements OnInit {
  #modal = inject(NzModalRef);
  campaigns: Campaign[] = [];
  campainsSelected: string[] = [];
  basket = new Basket();

  constructor(
    private store: Store,
    private formatSrv: FormatService,
    private profileSrv: ProfileService,
    private orderSrv: OrderService,
    private campaignSrv: CampaignService
  ) { }

  ngOnInit(): void {
    this.basket = this.orderSrv.getCartItems();
    this.campainsSelected = this.basket.cart.campaign_ids;
    const fetchCampaign = this.store.select(selectCampaigns)
      .pipe(
        filter(data => data.campaigns.length > 0)
      )
      .subscribe({
        next: data => {
          this.campaigns = data.campaigns.map(cp => {
            return {
              ...cp,
              disabled: false,
              checked: false
            };
          });
          this.disableCampaigns();
        },
        complete: () => {
          fetchCampaign.unsubscribe();
        }
      });
  }

  disableCampaigns() {
    this.campaigns.forEach(cp => {
      const isValidCampaign = this.campaignSrv.isValidCampaign(this.profileSrv.getProfileInSession()._id, cp, this.basket.subtotal);
      cp.checked = this.basket.cart.campaign_ids.includes(cp._id);
      cp.disabled = !cp.checked && (!isValidCampaign || this.campainsSelected.some(selectedId => {
        const selectedCampaign = this.campaigns.find(campaign => campaign._id === selectedId);
        if (selectedCampaign) {
          if (selectedCampaign.discount.type === CampaignDiscountType.DELIVERY) {
            return cp.discount.type === CampaignDiscountType.DELIVERY;
          } else {
            return cp.discount.type === CampaignDiscountType.PERCENTAGE || cp.discount.type === CampaignDiscountType.NET;
          }
        }
        return false;
      }));
    });
  }

  selectPromotion(id: string) {
    const index = this.campaigns.findIndex(cp => cp._id === id);
    if (index !== -1) {
      const currentCampaign = this.campaigns[index];
      if (!currentCampaign.checked) {
        const isValidCampaign = this.campaignSrv.isValidCampaign(this.profileSrv.getProfileInSession()._id, currentCampaign, this.basket.subtotal);
        if (isValidCampaign) {
          currentCampaign.checked = true;
          this.campainsSelected.push(currentCampaign._id);
        }

        const disableCpm = (type: CampaignDiscountType) => {
          this.campaigns.forEach(cp => {
            if (cp._id !== currentCampaign._id && cp.discount.type === type) {
              cp.disabled = true;
            }
          });
        };

        switch (currentCampaign.discount.type) {
          case CampaignDiscountType.DELIVERY:
            disableCpm(CampaignDiscountType.DELIVERY);
            break;
          case CampaignDiscountType.PERCENTAGE:
          case CampaignDiscountType.NET:
            disableCpm(CampaignDiscountType.PERCENTAGE);
            disableCpm(CampaignDiscountType.NET);
            break;
        }

      } else {
        const index = this.campainsSelected.findIndex(cp => cp == currentCampaign._id);
        this.campainsSelected.splice(index, 1);
        currentCampaign.checked = false;
        this.campaigns.forEach(cp => {
          const isValidCampaign = this.campaignSrv.isValidCampaign(this.profileSrv.getProfileInSession()._id, cp, this.basket.subtotal);
          cp.disabled = !isValidCampaign;
        });
      }

    }
  }

  destroyModal(): void {
    this.#modal.destroy();
  };

  applyPromotion() {
    this.#modal.close(this.campainsSelected);
  }

  formatDate(isoDate: string): string {
    return this.formatSrv.formatDate(isoDate);
  }
}
