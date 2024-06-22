import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { URLConstant } from "../constants/url.constant";
import { Campaign } from "../models/campaign/campain.model";
import { Cart } from "../models/order/order.model";
import { selectCampaigns } from "../store/campaign/campaign.selectors";
import { CampaignDiscountType, CampaignScopeType } from "../utils/enums/index.enum";
import { OrderService } from "./order.service";
import { ProfileService } from "./profile.service";

@Injectable({
  providedIn: "root"
})
export class CampaignService {
  private baseUrl = URLConstant.API.ENDPOINT;
  constructor(
    private http: HttpClient,
    private store: Store,
    private profileSrv: ProfileService,
    private orderSrv: OrderService
  ){}

  fetchAllCampaign(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.baseUrl + URLConstant.API.CAMPAIGN.GET_ALL);
  }

  caculateDiscountValue (delivery_fare: number): number{
    let campaigns: Campaign[] = [];
    const campaignSelector$ = this.store.select(selectCampaigns).subscribe({
      next: data => campaigns = data.campaigns,
      complete: () => { campaignSelector$.unsubscribe() }
    })

    const cus_id = this.profileSrv.getProfileInSession()._id;
    const discount_value = this.validateAndApplyCampaign(cus_id, campaigns, this.orderSrv.getCartItems(), delivery_fare)

    return discount_value;
  }

  isValidCampaign(customer_id: string, campaign: Campaign, subtotal: number){
    const currDate = new Date();

    return campaign &&
      new Date(campaign.conditions.start_time) <= currDate &&
      new Date(campaign.conditions.end_time) >= currDate &&
      campaign.quotas.limit > campaign.unavailable_users.length &&
      campaign.unavailable_users.filter(id => id === customer_id).length < campaign.quotas.total_count_per_count &&
      subtotal >= campaign.conditions.minBasketAmount;
  }

  validateAndApplyCampaign(customer_id: string, campaigns: Campaign[], order: Cart, delivery_fare: number): number{
    let total_discount_value = 0;
    for (const campaign_id of order.cart.campaign_ids) {
      const index = campaigns.findIndex(cp => cp._id === campaign_id)
      const campaign = campaigns[index];

      if (this.isValidCampaign(customer_id, campaign, order.subtotal)) {
        switch (campaign.discount.type) {
          case CampaignDiscountType.DELIVERY:
            total_discount_value += (delivery_fare - campaign.discount.value) > 0 ? campaign.discount.value : delivery_fare;
            break;

          case CampaignDiscountType.NET:
            switch(campaign.discount.scope.type) {
              case CampaignScopeType.ORDER:
                const discount_value = order.subtotal - campaign.discount.value;
                total_discount_value += discount_value > 0 ? campaign.discount.value : order.subtotal
                break;
              case CampaignScopeType.CATEGORY:
                break;
              case CampaignScopeType.ITEMS:
                break;
            }
            break;

          case CampaignDiscountType.PERCENTAGE:
            switch(campaign.discount.scope.type){
              case CampaignScopeType.ORDER:
                const discount_value = order.subtotal * (campaign.discount.value / 100)
                if(discount_value <= campaign.discount.cap) {
                  total_discount_value += discount_value
                } else total_discount_value += campaign.discount.cap
                break;
              case CampaignScopeType.CATEGORY:
                break;
              case CampaignScopeType.ITEMS:
                break;
            }
            break;

          case CampaignDiscountType.TRANSPORT:
            const discount_value = order.subtotal - campaign.discount.value;
            total_discount_value += discount_value > 0 ? campaign.discount.value : order.subtotal
            break;

          default:
            break
        }
      }
    }
    return total_discount_value;
  }

}
