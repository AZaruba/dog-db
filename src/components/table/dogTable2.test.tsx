import { Dog } from "../../constants/types";
import { DogTable2 } from "./dogTable2";
import { render, screen, fireEvent } from "@testing-library/react";

describe('Dog Table 2', () => {
  let dogList: Dog[] = [
    {
      id: "123",
      img: "",
      name: "One",
      age: 0,
      zip_code: "12345",
      breed: "Cool Dog"
    },
    {
      id: "456",
      img: "",
      name: "Two",
      age: 1,
      zip_code: "12345",
      breed: "VERY Cool Dog"
    }
  ];
  let selectedDogs: string[] = [];

  function testOnSelect(id: string, isSelected: boolean): void {
    if (isSelected) {
      selectedDogs.push(id);
    } else {
      selectedDogs.splice(selectedDogs.indexOf(id), 1);
    }
  } 

  beforeEach(() => {
    selectedDogs = [];
  });

  it('Correctly adds dogs to the match list', () => {
    render(
      <DogTable2 
       dogs={dogList} 
       selectedDogs={selectedDogs} 
       onDogSelected={testOnSelect}
      />
    );

    const card = screen.getByTestId('card-click-456');
    fireEvent.click(card);
  });
});