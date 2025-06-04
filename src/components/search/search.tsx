import { useEffect, useState } from "react";
import { GetDogBreeds } from "../../utilities/fetchRequest";
import { Container, InputLabel, MenuItem, Select, Stack } from "@mui/material";

export interface IDogSearchProps {

}

export function DogSearch(props: IDogSearchProps) {
  const [breedList, setBreedList] = useState<string[]>();
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  useEffect(() => {
    if (breedList) {
      return;
    }

    GetDogBreeds().then((breeds) => {
      setBreedList(breeds);
    }).catch((_error) => {
      setBreedList([]);
    });
  });

  function onBreedSelected(breed: string[]) {
    setSelectedBreeds(breed);
  }
  return (
    <Container maxWidth='sm'>
      <Stack>
        {breedList && breedList.length > 0 &&
        <>
          <InputLabel id="breed-select-label">Breed</InputLabel>
          <Select multiple
              labelId="breed-select-label"
              id="breed-select"
              value={selectedBreeds}
              label="Age"
              onChange={(e) => {
                onBreedSelected(e.target.value as string[]);
              }}
            >
              {
                breedList?.map((breed) => {
                  return <MenuItem value={breed}>{breed}</MenuItem>
                })
              }
          </Select>
        </>
        }
      </Stack>
    </Container>
  )
}