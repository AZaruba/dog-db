import { useEffect, useState } from "react";
import { GetDogBreeds } from "../../utilities/fetchRequest";
import { Button, Container, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";

export interface IDogSearchProps {
  onDogSearch: (breedList: string[], ageMin: number | null, ageMax: number | null, zipCodes?: string[]) => void;
}

export function DogSearch(props: IDogSearchProps) {
  const [breedList, setBreedList] = useState<string[]>();
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [ageMin, setageMin] = useState<number | null>(0);
  const [ageMax, setageMax] = useState<number | null>(100);
  const [zipCodes, setZipCodes] = useState<string[]>();

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

  return (
    <Container maxWidth='md'>
    <Stack direction='row' maxWidth={'md'} gap='20px' justifyItems={'center'}>
        {breedList && breedList.length > 0 &&
        <Stack direction='column'>
          <InputLabel id="breed-select-label">Breed</InputLabel>
          <Select multiple
            size='small'
            style={{minWidth: 400, maxWidth: 400}}
            labelId="breed-select-label"
            id="breed-select"
            value={selectedBreeds}
            onChange={(e) => {
              setSelectedBreeds(e.target.value as string[]);
            }}
          >
            {
              breedList?.map((breed) => {
                return <MenuItem value={breed}>{breed}</MenuItem>
              })
            }
          </Select>
        </Stack>
        }

        <Stack direction='column'>
          <InputLabel id="min-age-label">Min Age</InputLabel>
          <TextField
          style={{width: '100px'}}
          size='small'
          type='number'
          id="min-age"
          value={ageMin}
          onChange={(e) => {
            setageMin(e.target.value as unknown as number);
          }}
          >
          </TextField>
        </Stack>
        <Stack direction='column'>
          <InputLabel id="max-age-label">Max Age</InputLabel>
          <TextField
          style={{width: '100px'}}
          size='small'
          type='number'
          id="max-age"
          value={ageMax}
          onChange={(e) => {
            setageMax(e.target.value as unknown as number);
          }}
          >
          </TextField>
        </Stack>
        <Button
         style={{minWidth: 100, height: 40, alignSelf: 'end'}}
         data-testid='searchButton'
         variant='outlined'
         onClick={() => {
           props.onDogSearch(
            selectedBreeds,
            ageMin,
            ageMax,
            zipCodes
           );
         }}
        >
          Search
        </Button>
    </Stack>
    </Container>
  )
}