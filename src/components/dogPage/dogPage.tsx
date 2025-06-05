import { useState } from "react";
import { DogTable } from "../table/dogTable";
import { DogSearch } from "../search/search";
import { GetDogs, GetDogsFromIds } from "../../utilities/fetchRequest";
import { Dog, SortConfig, SortDir } from "../../constants/types";
import { Box } from "@mui/material";

export function DogPage() {
  const [queryCursor, setQueryCursor] = useState<string>();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDogs, setSelectedDogs] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>();

  function onDogSearch(
    breedList: string[], 
    ageMin: number | null, 
    ageMax: number | null, 
    zipCodes?: string[]
  ) {
    setIsLoading(true);
    let sortString: string | undefined;

    if (sortConfig) {
      sortString = `${sortConfig.column}:${sortConfig.dir}`;
    }

    GetDogs({
      breeds: breedList,
      ageMax: ageMax,
      ageMin: ageMin,
      zipCodes: zipCodes,
      sort: sortString,
      from: queryCursor
    }).then((result) => {
      if (result && result.resultIds) {
        GetDogsFromIds(result.resultIds).then((result) => {
          setDogs(result);
          setIsLoading(false);
        })
      }
    });
  }

  function onDogSelected(id: string, isSelected: boolean) {
    const newSelectedDogs = [...selectedDogs];
    if (isSelected) {
      newSelectedDogs.push(id);
    } else {
      newSelectedDogs.splice(newSelectedDogs.indexOf(id), 1);
    }
    setSelectedDogs(newSelectedDogs);
  }

  function onSortClick(col: string, dir?: SortDir) {
    if (dir) {
      setSortConfig({
        column: col,
        dir: dir
      });
    } else {
      setSortConfig(undefined);
    }
  }
  
  return (
  <>
    <DogSearch isLoading={isLoading} sortConfig={sortConfig} onDogSearch={onDogSearch}/>
    {
      isLoading && 
      <Box
       padding='16px'
       display="flex"
       justifyContent="center"
       alignItems="center"
      >
        <div>Loading Dogs...</div>
      </Box>
    }
    {
      !isLoading && 
      <DogTable 
       dogs={dogs} 
       sortConfig={sortConfig}
       onDogSelected={onDogSelected}
       onSortClick={onSortClick}
      />
    }
  </>);
}