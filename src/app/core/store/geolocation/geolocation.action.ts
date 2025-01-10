import { createAction, props } from "@ngrx/store";
import { AddressSearchResult } from "../../models/geolocation/location.model";

const SEARCH_ADDRESS = '[address] get address'
const SEARCH_ADDRESS_SUCCESS = '[address] get address success'
const SEARCH_ADDRESS_FAILURE = '[address] get address failed'

export const searchAddress = createAction (
  SEARCH_ADDRESS,
  props<{ latlng: { lat: number, lng: number } }>()
)

export const searchAddressSuccess = createAction (
  SEARCH_ADDRESS_SUCCESS,
  props<{ data: AddressSearchResult }>()
)

export const searchAddressFailure = createAction (
  SEARCH_ADDRESS_FAILURE,
  props<{ error: string }>()
)
