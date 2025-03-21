import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { CampaignService } from "../../services/campaign.service";
import * as campaignAction from './campaign.actions';
@Injectable()
export class CampaignEffects {
  constructor(
    private action$: Actions,
    private campaignSrv: CampaignService
  ) { }

  _getAllCampaign = createEffect(() =>
    this.action$.pipe(
      ofType(campaignAction.getCampaignAvailableForRestaurant),
      exhaustMap((dto) => {
        return this.campaignSrv.getCampaignAvailableForRestaurant(dto.restaurantId).pipe(
          map(data => campaignAction.getAllSuccess({ campaigns: data })),
          catchError(error => of(campaignAction.getAllCampaignFailure({ error: error })))
        );
      })
    )
  );
}
