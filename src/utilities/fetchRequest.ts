import { Dog, IDogTableFilter, IDResponse } from "../constants/types";

const BASE_URL = 'https://frontend-take-home-service.fetch.com';
const ENDPOINT_AUTH = '/auth/login';
const ENDPOINT_AUTH_LOGOUT = '/auth/logout';
const ENDPOINT_DOGS = '/dogs';
const ENDPOINT_DOGS_BREEDS = '/dogs/breeds';
const ENDPOINT_DOGS_MATCH = '/dogs/match';
const ENDPOINT_DOGS_SEARCH = '/dogs/search';
// const ENDPOINT_LOCATIONS = '/locations';
// const ENDPOINT_LOCATIONS_SEARCH = '/locations/search'

export async function Authenticate(name: string, email: string): Promise<boolean> {
  return fetch(
    BASE_URL + ENDPOINT_AUTH,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
          'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    }
  ).then((result) => {
    return result.status === 200;
  }).catch((error) => {
    console.log(error);
    return false;
  });
}

export async function Logout(): Promise<undefined> {
  return fetch(
    BASE_URL + ENDPOINT_AUTH_LOGOUT,
    {
      credentials: 'include',
      method: 'POST'
    }
  ).then(() => {
    return undefined;
  }).catch((error) => {
    console.log(error);
    return undefined;
  });
}

export async function GetDogBreeds(): Promise<string[] | undefined> {
  return fetch(
    BASE_URL + ENDPOINT_DOGS_BREEDS,
    {
      credentials: 'include',
      method: 'GET'
    }
  ).then((result) => {
    if (result.status !== 200) {
      return [];
    }
    return result.json();
  }).catch((error) => {
    console.log(error);
    return [];
  });
}

export function ConvertToSearchParams(filter: IDogTableFilter): URLSearchParams {
  const params = new URLSearchParams();
  Object.keys(filter).forEach((field) => {
    if ((field === 'breeds' || field === 'zipCodes')) {
      if(filter[field] && filter[field].length > 0) {
        filter[field].forEach((fieldValue) => {
          params.append(field, fieldValue);
        })
      }
    } else if (filter[field]) {
      params.append(field, filter[field].toString());
    }
  });

  return params
}

export async function GetDogs(filter: IDogTableFilter): Promise<IDResponse | undefined> {

  return fetch(
    BASE_URL + ENDPOINT_DOGS_SEARCH + '?' + ConvertToSearchParams(filter).toString(),
    {
      credentials: 'include',
      method: 'GET'
    }
  ).then((result) => {
    if (result.status != 200) {
      return undefined;
    }
    return result.json();
  }).catch((error) => {
    console.log(error);
    return undefined;
  });
}

export async function GetDogsFromIds(ids: string[]): Promise<Dog[]> {
  return fetch(
    BASE_URL + ENDPOINT_DOGS,
    {
      credentials: 'include',
      headers: {
          'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(ids)
    }
  ).then((result) => {
    if (result.status !== 200) {
      return [];
    }
    return result.json();
  }).catch((error) => {
    console.log(error);
    return [];
  });
}

export async function GetMatch(ids: string[]): Promise<string> {

  return fetch(
    BASE_URL + ENDPOINT_DOGS_MATCH,
    {
      credentials: 'include',
      headers: {
          'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(ids)
    }
  ).then((result) => {
    if (result.status !== 200) {
      return '';
    }
    return result.json().then((json) => {
      return json.match;
    });
  }).catch((error) => {
    console.log(error);
    return '';
  })
}