
const BASE_URL = 'https://frontend-take-home-service.fetch.com';
const ENDPOINT_AUTH = '/auth/login';

export async function Authenticate(name: string, email: string): Promise<boolean> {
  return fetch(
    BASE_URL + ENDPOINT_AUTH,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
          'content-type': 'application/json'
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
  })
}