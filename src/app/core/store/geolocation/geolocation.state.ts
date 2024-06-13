import { AddressSearchResult } from "../../models/geolocation/location.model";

export interface SearchState {
  data: AddressSearchResult
  isLoading: boolean,
  error: string
}


export const initialSearchState: SearchState = {
  data: {
    results: [],
    status: ''
  },
  isLoading: false,
  error: ''
}

