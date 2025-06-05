import { useEffect, useState } from "react";
import { GetDogBreeds } from "../../utilities/fetchRequest";
import { Box, Button, Container, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { SortConfig } from "../../constants/types";

export interface IDogSearchProps {
  isLoading: boolean;
  sortConfig?: SortConfig;
  queryCursor: number;
  onDogSearch: (breedList: string[], ageMin: number | null, ageMax: number | null, zipCodes?: string[], resetCursor?: boolean) => void;
}

export function DogSearch(props: IDogSearchProps) {
  const [breedList, setBreedList] = useState<string[]>();
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [ageMin, setageMin] = useState<number | null>(0);
  const [ageMax, setageMax] = useState<number | null>(0);
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

  useEffect(() => {
    props.onDogSearch(
      selectedBreeds,
      ageMin,
      ageMax,
      zipCodes
    );
  }, [props.sortConfig, props.queryCursor])

  return (
    <Box
      padding='16px'
      display="flex"
      justifyContent="start"
      flexDirection={'column'}
      alignItems="center"
      width={'80vw'}
    >
    <Stack direction='row' maxWidth={'md'} gap='20px' justifyItems={'center'}>
        {breedList && breedList.length > 0 &&
        <Stack direction='column'>
          <InputLabel id="breed-select-label">Breed</InputLabel>
          <Select multiple
            disabled={props.isLoading}
            size='small'
            style={{minWidth: '20vw', maxWidth: '20vw'}}
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

        <Stack direction='column' >
          <InputLabel id="min-age-label">Min Age</InputLabel>
          <TextField
          disabled={props.isLoading}
          style={{width: '100px'}}
          size='small'
          type='number'
          id="min-age"
          value={ageMin}
          onChange={(e) => {
            const floor = Math.max(0, e.target.value as unknown as number);
            setageMin(floor);
          }}
          >
          </TextField>
        </Stack>
        <Stack direction='column'>
          <InputLabel id="max-age-label">Max Age</InputLabel>
          <TextField
          disabled={props.isLoading}
          style={{width: '100px'}}
          size='small'
          type='number'
          id="max-age"
          value={ageMax}
          onChange={(e) => {
            const floor = Math.max(0, e.target.value as unknown as number);
            setageMax(floor);
          }}
          >
          </TextField>
        </Stack>
        <Button
         loading={props.isLoading}
         style={{minWidth: 100, height: 40, alignSelf: 'end'}}
         data-testid='searchButton'
         variant='outlined'
         onClick={() => {
           props.onDogSearch(
            selectedBreeds,
            ageMin,
            ageMax,
            zipCodes,
            true
           );
         }}
        >
          Search
        </Button>
    </Stack>
    </Box>
  )
}