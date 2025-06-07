import { fireEvent, render, screen } from "@testing-library/react";
import { SortButton } from "./sortButton"
import { SortConfig } from "../../constants/types";

describe('Sort Button', () => {
  const mockClick = jest.fn();

  it('renders', () => {
    render(
      <SortButton 
       column={"testCol"} 
       onClick={mockClick}/>
    );
  });

  it('renders the up sort', () => {
    const sortConfig: SortConfig = {
      column: "testCol",
      dir: "asc"
    };

    render(
      <SortButton 
       column={"testCol"} 
       sortConfig={sortConfig}
       onClick={mockClick}/>
    );

    expect(screen.queryByTestId('sort-up')).toBeTruthy();
  });

  it('renders the down sort', () => {
    const sortConfig: SortConfig = {
      column: "testCol",
      dir: "desc"
    };

    render(
      <SortButton 
       column={"testCol"} 
       sortConfig={sortConfig}
       onClick={mockClick}/>
    );

    expect(screen.queryByTestId('sort-down')).toBeTruthy();
  });

  it('runs onClick', () => {
    render(
      <SortButton 
       column={"testCol"} 
       onClick={mockClick}/>
    );

    const testClick = screen.getByTestId('sort_testCol');
    fireEvent.click(testClick);

    expect(mockClick).toHaveBeenCalled();
  })
})