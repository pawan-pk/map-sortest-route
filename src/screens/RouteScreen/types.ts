export interface AddressesData {
  predictions: Prediction[];
  status: string;
  error_message?: string | undefined;
}

export interface Prediction {
  description: string;
  place_id: string;
}

export interface LatLongRequestResponse {
  results: Result[];
  status: string;
  error_message?: string | undefined;
}

export interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Geometry {
  location: Location;
  location_type: string;
}
export interface Location {
  lat: number;
  lng: number;
}
