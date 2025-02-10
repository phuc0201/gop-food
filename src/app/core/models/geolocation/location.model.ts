import { RoleType } from "../common/enums/index.enum";

export interface ILocation {
  type: string,
  coordinates: number[]; // long lat
  address: string;
}

export class SelectedAddress {
  address: string = '';
  coordinates: [number, number] = [0, 0];
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

export class LocationMarker {
  type: RoleType = RoleType.CUSTOMER;
  iconUrl: string = '';
  coordinates: number[] = [];
  marker: any;
  constructor(type: RoleType, iconUrl: string, coordinates: number[]) {
    this.type = type;
    this.iconUrl = iconUrl;
    this.coordinates = coordinates;
  }
}
