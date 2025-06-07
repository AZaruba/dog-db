import { useEffect, useState } from "react";
import { GetDogBreeds } from "../../utilities/fetchRequest";
import { Box, Button, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { SortConfig } from "../../constants/types";
import styles from '../../style/global.module.scss';

export interface IDogSearchProps {
  isLoading: boolean;
  sortConfig?: SortConfig;
  queryCursor: number;
  onDogSearch: (breedList: string[], ageMin: number | null, ageMax: number | null, zipCodes?: string[], resetCursor?: boolean) => void;
  onViewSelected: (isSelcted: boolean) => void;
}

export function DogSearch(props: IDogSearchProps) {
  const [breedList, setBreedList] = useState<string[]>();
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [ageMin, setageMin] = useState<number | null>(0);
  const [ageMax, setageMax] = useState<number | null>(0);
  const [zipCodes, setZipCodes] = useState<string[]>();
  const [zipCodeError, setZipCodeError] = useState<string>();
  const [isSelcted, setIsSelected] = useState<boolean>(false);

  function onSetZipCode(code: string) {
    const match = /^\d{5,5}$/.exec(code);
    if (match === null) {
      setZipCodeError('Invalid zip code');
    } else {
      setZipCodeError(undefined);
      setZipCodes([code]);
    }
  }

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
      gap={'16px'}
      justifyContent="center"
      flexDirection={'row'}
      alignItems="center"
      width={'85vw'}
      flexWrap={'wrap'}
    >
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
        style={{width: '80px'}}
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
        style={{width: '80px'}}
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
      <Stack direction='column'>
        <InputLabel id="zip-code-label">Zip Code</InputLabel>
          <TextField
          error={zipCodeError !== undefined}
          helperText={zipCodeError}
          disabled={props.isLoading}
          style={{width: '150px', height: 40, overflowY: 'visible'}}
          size='small'
          id="zip-code"
          onChange={(e) => {
            if (e.target.value.length > 0) {
              onSetZipCode(e.target.value);
            } else {
              setZipCodes(undefined);
            }
          }}
          >
          </TextField>
      </Stack>
      <Button
        className={styles.loginButton}
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
    </Box>
  )
}