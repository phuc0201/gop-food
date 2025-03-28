import { createReducer, on } from "@ngrx/store";
import * as campaignAction from './campaign.actions';
import { initialCampaignsState } from "./campaign.state";
export const campaignReducer = createReducer(
  initialCampaignsState,
  on(campaignAction.getCampaignAvailableForRestaurant, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(campaignAction.getAllSuccess, (state, { campaigns }) => {
    return {
      ...state,
      isLoading: false,
      campaigns: campaigns
    };
  }),
  on(campaignAction.getAllCampaignFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error
    };
  })
);
