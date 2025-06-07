import { Dog, IDResponse } from "../constants/types";
import { Authenticate, GetDogBreeds, GetDogs, GetDogsFromIds, GetMatch, Logout } from "./fetchRequest";

const mockIDResponse: IDResponse = {
  resultIds: ['1', '2'],
  next: '25',
  total: 200,
  code: 200
}

const mockBadResponse: IDResponse = {
  resultIds: [],
  next: '0',
  total: 0,
  code: 400
}


const mockDogResponse: Dog[] = [
  {
    id: "1",
    img: "img",
    name: "Andrew",
    age: 1,
    zip_code: "12345",
    breed: "Cool Dog"
  }
]

describe('Fetch Request Library', () => {
  it('Authenticates', () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200
    });

    Authenticate('name', 'email').then((result) => {
      expect(result).toBeTruthy();
    });
  });

  it('Rejects a bad authentication', () => {
    global.fetch = jest.fn().mockRejectedValue({})

    Authenticate('name', 'email').then((result) => {
      expect(result).toBeFalsy();
    });
  });

  it('Logs Out', () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200
    });

    Logout().then((result) => {
      expect(result).toBeUndefined();
    });
  });

  it('Handles logout errors', () => {
    global.fetch = jest.fn().mockRejectedValue({});

    Logout().then((result) => {
      expect(result).toBeUndefined();
    });
  });

  it('Gets Dog Breeds', () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: () => { return { result: 'good'}}
    });

    GetDogBreeds().then((result) => {
      expect(result).toEqual({
        result: 'good'
      });
    });
  });

  it('Returns nothing on a bad response', () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 404,
      json: () => { return { result: 'good'}}
    });

    GetDogBreeds().then((result) => {
      expect(result).toEqual([]);
    });
  });

  it('Returns nothing on a bad response', () => {
    global.fetch = jest.fn().mockRejectedValue({});

    GetDogBreeds().then((result) => {
      expect(result).toEqual([]);
    });
  });

  it('Gets a list of dog IDs', () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: () => { return Promise.resolve(mockIDResponse); }
    });

    GetDogs({
      breeds: [],
      ageMax: null,
      ageMin: null
    }).then((result) => {
      expect(result).toEqual(mockIDResponse);
    });
  });

  it('Handles a bad dog request', () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 400,
      json: () => { return Promise.resolve(mockIDResponse); }
    });

    GetDogs({
      breeds: [],
      ageMax: null,
      ageMin: null
    }).then((result) => {
      expect(result).toEqual(mockBadResponse);
    });
  });

  it('Gets dogs from IDs', () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: () => { return mockDogResponse }
    });

    GetDogsFromIds(['1']).then((result) => {
      expect(result).toEqual(mockDogResponse);
    });
  });

  it('Handles a bad dog ID response', () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 404,
      json: () => { return mockDogResponse }
    });

    GetDogsFromIds(['1']).then((result) => {
      expect(result).toEqual([]);
    });
  });

  it('Gets a match from a list of IDs', () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: () => { return Promise.resolve({
        match: '123'
       }) }
    });

    GetMatch(['1','2','3']).then((result) => {
      expect(result).toEqual('123');
    });
  })
});