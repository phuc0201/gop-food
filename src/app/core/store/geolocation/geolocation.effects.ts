import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { GeolocationService } from "../../services/geolocation.service";
import * as geolocationAction from './geolocation.actions';
@Injectable()
export class GeolocationEffects {
  constructor(
    private action$: Actions,
    private geoSrv: GeolocationService
  ){}

  _searchAddress = createEffect(()=>
  this.action$.pipe(
    ofType(geolocationAction.searchAddress),
    exhaustMap((dto) => this.geoSrv.searchAddressByLocation(dto.latlng.lat, dto.latlng.lng).pipe(
      map((data) => geolocationAction.searchAddressSuccess({ data: data})),
      catchError(error => of(geolocationAction.searchAddressFailure({error: error})))
    )),
  ))
}
