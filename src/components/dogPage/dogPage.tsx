import { useState } from "react";
import { DogTable } from "../table/dogTable";
import { DogSearch } from "../search/search";
import { GetDogs, GetDogsFromIds } from "../../utilities/fetchRequest";
import { DefaultSortConfig, Dog, SortConfig, SortDir } from "../../constants/types";
import { Box, Stack } from "@mui/material";
import { PaginationControls } from "../paginationControls/paginationControls";
import { MatchButton } from "../matchButton/matchButton";
import { MatchResult } from "../matchResults/matchResults";

export function DogPage() {
  const [queryCursor, setQueryCursor] = useState<number>(0);
  const [totalDogs, setTotalDogs] = useState<number>(0);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDogs, setSelectedDogs] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>(DefaultSortConfig);
  const [matchDog, setMatchDog] = useState<Dog>();

  function onDogSearch(
    breedList: string[], 
    ageMin: number | null, 
    ageMax: number | null, 
    zipCodes?: string[],
    resetCursor?: boolean
  ) {
    setIsLoading(true);
    let sortString: string | undefined;

    if (sortConfig) {
      sortString = `${sortConfig.column}:${sortConfig.dir}`;
    }

    let from = queryCursor;
    if (resetCursor) {
      from = 0;
      setQueryCursor(0);
      setSelectedDogs([]);
    }

    GetDogs({
      breeds: breedList,
      ageMax: ageMax,
      ageMin: ageMin,
      zipCodes: zipCodes,
      sort: sortString,
      from: from
    }).then((result) => {
      if (result && result.resultIds) {
        setTotalDogs(result.total);
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
    setQueryCursor(0);
    if (dir) {
      setSortConfig({
        column: col,
        dir: dir
      });
    } else {
      setSortConfig(DefaultSortConfig);
    }
  }
  
  return (
  <>
    <Box
      padding='16px'
      display="flex"
      justifyContent="start"
      flexDirection={'column'}
      alignItems="center"
      height={'75vh'}
    >
    { !matchDog && 
    <>
    <Stack width={'90vh'}>To look for a match, pick out your desired breeds and age range, then click the checkbox on the right for each dog you'd like to be matched with. Hit match and we'll give you the perfect match!</Stack>
    <DogSearch isLoading={isLoading} sortConfig={sortConfig} queryCursor={queryCursor} onDogSearch={onDogSearch}/>
    {
      isLoading && 
      <Box
       padding='16px'
       display="flex"
       justifyContent="center"
       alignItems="center"
       height={'70vh'}
      >
        <div>Loading Dogs...</div>
      </Box>
    }
    </>
    }
    { !matchDog && 
    <>
      {
        !isLoading &&
          <DogTable 
          dogs={dogs} 
          sortConfig={sortConfig}
          selectedDogs={selectedDogs}
          onDogSelected={onDogSelected}
          onSortClick={onSortClick}
          />
      }
      <PaginationControls 
        totalRows={totalDogs} 
        page={Math.floor(queryCursor/ 25)} 
        pageSize={25}
        onPageChange={(offset) => {
          setQueryCursor(offset)
        }}
      />
      <MatchButton dogIds={selectedDogs} onClick={function (id: string): void {
        setMatchDog(dogs.filter((dog) => dog.id = id)[0]);
      } }/>
    </>
    }
    { matchDog &&
      <MatchResult dog={matchDog} onStartOver={() => {
        setMatchDog(undefined);
        setSelectedDogs([]);
      }}/>}
    </Box>
  </>);
}