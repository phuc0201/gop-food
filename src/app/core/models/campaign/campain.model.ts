import { CampaignDiscountType, CampaignScopeType, CampaignUserGroup, CurrencyCode } from "../../utils/enums/index.enum";

export class CampaignSelected {
  _id: string = '';
  discount_value: number = 0;
}


class CampaignScope {
  type: CampaignScopeType = CampaignScopeType.ORDER;
  object_ids: string[] = []
}

class CampaignQuotas {
  limit: number = 0;
  total_count_per_count: number = 0;
}

class CampaignDiscount {
  type: CampaignDiscountType = CampaignDiscountType.NET;
  cap: number = 0;
  value: number = 0
  scope = new CampaignScope();
}

class CampaignCondition {
  start_time: Date = new Date();
  end_time: Date = new Date();
  user_group: CampaignUserGroup = CampaignUserGroup.ALL_CUSTOMER
  minBasketAmount: number = 0;
}

export class Campaign {
  _id: string = '';
  restaurant_id: string = '';
  name: string = '';
  description: string = '';
  conditions: CampaignCondition = new CampaignCondition();
  discount: CampaignDiscount = new CampaignDiscount();
  quotas: CampaignQuotas = new CampaignQuotas();
  unavailable_users: string[] = [];
  currency_code: CurrencyCode = CurrencyCode.VND;
  image: string = '';
  checked: boolean = false;
  disabled: boolean = false;
}
