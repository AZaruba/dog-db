export interface IDogTableFilter {
  breeds: string[];
  ageMax: number | null;
  ageMin: number | null;
  zipCodes?: string[];
  size?: number;
  sort?: string;
  from?: string;
}

export type SortDir = 'asc' | 'desc'

export interface IDResponse {
  resultIds: string[];
  next: string;
}

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export const DogFields: Record<string, string> = {
  // 'id': "ID", backend ID, not user visible
  'img': "Image",
  'name': "Name",
  'age': "Age",
  "zip_code": "Zip Code",
  "breed": "Breed"
};

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}
export interface Coordinates {
  lat: number;
  lon: number;
}
