import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CampaignsState } from "./campaign.state";

export const selectAllCampaignState = createFeatureSelector<CampaignsState>('campaigns');

export const selectCampaigns = createSelector(
  selectAllCampaignState,
  (state) => state
);
