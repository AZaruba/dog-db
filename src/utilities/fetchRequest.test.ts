import { Authenticate, GetDogBreeds } from "./fetchRequest";


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
});