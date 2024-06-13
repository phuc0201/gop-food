export interface ILocation {
  type: string,
  coordinates: number[]; // long lat
}

export class AddressSelected {
  address: string = '';
  coordinates: number[] = [];
}


export interface AddressComponent {
  long_name: string;
  short_name: string;
}

export interface Geometry {
  location: {
    lat: number;
    lng: number;
  };
  boundary: null;
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface Compound {
  district: string;
  commune: string;
  province: string;
}

export interface Address {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  reference: string;
  plus_code: PlusCode;
  compound: Compound;
  types: string[];
  name: string;
  address: string;
}

export interface AddressSearchResult {
  results: Address[];
  status: string;
}
