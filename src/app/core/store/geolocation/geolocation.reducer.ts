import { createReducer, on } from "@ngrx/store";
import * as geolocaitonAction from './geolocation.actions';
import { initialSearchState } from "./geolocation.state";

const _searchAddress = createReducer(
  initialSearchState,
  on(geolocaitonAction.searchAddress, (state) => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(geolocaitonAction.searchAddressSuccess, (state, { data })=>{
    return {
      ...state,
      data: data,
      isLoading: false
    }
  }),
  on(geolocaitonAction.searchAddressFailure, (state, { error })=>{
    return {
      ...state,
      error: error,
      isLoading: false
    }
  })
)

export function searchAddressReducer(state: any, action: any){
  return _searchAddress(state, action);
}
