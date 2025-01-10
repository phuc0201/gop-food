import { createReducer, on } from "@ngrx/store";
import * as campaignAction from './campaign.action';
import { initialCampaignsState } from "./campaign.state";
const _getAllCampaign = createReducer(
  initialCampaignsState,
  on(campaignAction.getAllCampaign, (state) => {
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

export function getAllCampaignReducer(state: any, action: any) {
  return _getAllCampaign(state, action);
}
