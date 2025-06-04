
const BASE_URL = 'https://frontend-take-home-service.fetch.com';
const ENDPOINT_AUTH = '/auth/login';
const ENDPOINT_DOGS = '/dogs';
const ENDPOINT_DOGS_BREEDS = '/dogs/breeds';
const ENDPOINT_DOGS_MATCH = '/dogs/match';
const ENDPOINT_DOGS_SEARCH = '/dogs/search';
const ENDPOINT_LOCATIONS = '/locations';
const ENDPOINT_LOCATIONS_SEARCH = '/locations/search'

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

export async function GetDogBreeds(): Promise<string[] | undefined> {
  return fetch(
    BASE_URL + ENDPOINT_DOGS_BREEDS,
    {
      credentials: 'include',
      method: 'GET'
    }
  ).then((result) => {
    console.log(result);
    return result.json();
  }).catch((error) => {
    console.log(error);
    return [];
  });
}