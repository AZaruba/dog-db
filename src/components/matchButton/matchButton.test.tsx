import { act, fireEvent, render, screen} from "@testing-library/react";
import { MatchButton } from "./matchButton";

describe('Match Button', () => {
  const testOnClick = jest.fn();

  it('renders', () => {
    render(
      <MatchButton dogIds={[]} onClick={testOnClick}/>
    );

    expect(screen.queryByTestId('match-button')).toBeTruthy();
  });
  
  it('should not click on an empty list', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: () => { return Promise.resolve({
        match: 'match'
      }) }
    });

    render(
      <MatchButton dogIds={[]} onClick={testOnClick}/>
    );

    const button = screen.queryByTestId('match-button');
    expect(button).toBeTruthy();

    await act(async () => {
      if (button) {
        fireEvent.click(button);
      }
    })

    expect(testOnClick).not.toHaveBeenCalled();
  });

  it('finds a match on click', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: () => { return Promise.resolve({
        match: 'match'
      }) }
    });

    render(
      <MatchButton dogIds={['123']} onClick={testOnClick}/>
    );

    const button = screen.queryByTestId('match-button');
    expect(button).toBeTruthy();

    await act(async () => {

      if (button) {
        fireEvent.click(button);
      }
    })
    expect(testOnClick).toHaveBeenCalled();
  });
});