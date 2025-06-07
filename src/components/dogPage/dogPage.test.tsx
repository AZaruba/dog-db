
import { act, render } from "@testing-library/react";
import { DogPage } from "./dogPage";
import * as fetchReq from '../../utilities/fetchRequest';

describe('Dog Page', () => {

  const authMock = jest.fn();
  it('Blocks no authentication on load via query', async () => {
    jest.spyOn(fetchReq, 'GetDogs').mockResolvedValue({
        resultIds: [],
        next: '0',
        total: 0,
        code: 401
    })

    render(
      <DogPage onAuthCheck={(code: number) => {
        authMock(code);
      }}>
      </DogPage>
    );

    await new Promise(process.nextTick);
    expect(authMock).toHaveBeenCalledWith(401);
  });

  it('Authenticates on load via query', async () => {
    jest.spyOn(fetchReq, 'GetDogs').mockResolvedValue({
        resultIds: [],
        next: '0',
        total: 0,
        code: 200
    });
    jest.spyOn(fetchReq, 'GetDogsFromIds').mockResolvedValue([]);

    await act(() => render(
      <DogPage onAuthCheck={(code: number) => {
        authMock(code);
      }}>
      </DogPage>
    ));

    await new Promise(process.nextTick);
    expect(authMock).toHaveBeenCalledWith(200);
  });
});