import { Campaign } from "../../models/campaign/campain.model";

export class CampaignsState {
  campaigns: Campaign[] = [];
  isLoading: boolean = false;
  error: string = '';
}

export const initialCampaignsState = new CampaignsState();
