import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CampaignsState } from "./campaign.state";

export const selectAllCampaignState = createFeatureSelector<CampaignsState>('get_campaigns')

export const selectCampaigns = createSelector (
  selectAllCampaignState,
  (state) => state
)
