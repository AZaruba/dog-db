import { useEffect, useState } from "react";
import { DogSearch } from "../search/search";
import { GetDogs, GetDogsFromIds } from "../../utilities/fetchRequest";
import { DefaultSortConfig, Dog, SortConfig, SortDir } from "../../constants/types";
import { Box } from "@mui/material";
import { IPaginationControlsProps } from "../paginationControls/paginationControls";
import { IMatchButtonProps } from "../matchButton/matchButton";
import { MatchResult } from "../matchResults/matchResults";
import { DogTableContainer } from "../table/dogTableContainer";
import { IDogTableProps } from "../table/dogTable2";
import { SortBar } from "../sortBar/sortBar";

export interface IDogPageProps {
  isAuthed?: boolean;
  onAuthCheck: (code: number) => void;
}

export function DogPage(props: IDogPageProps) {
  const [queryCursor, setQueryCursor] = useState<number>(0);
  const [totalDogs, setTotalDogs] = useState<number>(0);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDogs, setSelectedDogs] = useState<Record<string, Dog>>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>(DefaultSortConfig);
  const [matchDog, setMatchDog] = useState<Dog>();

  useEffect(() => {
     GetDogs({
      breeds: [],
      ageMax: null,
      ageMin: null,
    }).then((result) => {
      if (result && result.code === 401) {
        props.onAuthCheck(result.code);
        setIsLoading(false);
      } else if (result && result.resultIds) {
        props.onAuthCheck(result.code);
        setTotalDogs(result.total);
        GetDogsFromIds(result.resultIds).then((result) => {
          setDogs(result);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, []);

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
    }

    GetDogs({
      breeds: breedList,
      ageMax: ageMax,
      ageMin: ageMin,
      zipCodes: zipCodes,
      sort: sortString,
      from: from
    }).then((result) => {
      if (result && result.code === 401) {
        props.onAuthCheck(result.code);
        setIsLoading(false);
      } else if (result && result.resultIds) {
        props.onAuthCheck(result.code);
        setTotalDogs(result.total);
        GetDogsFromIds(result.resultIds).then((result) => {
          setDogs(result);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }

  console.log(selectedDogs);
  function onDogSelected(dog: Dog, isSelected: boolean) {
    const newSelectedDogs = {...selectedDogs};
    if (isSelected) {
      newSelectedDogs[dog.id] = structuredClone(dog);
    } else {
      delete newSelectedDogs[dog.id];
    }
    setSelectedDogs(newSelectedDogs);
  }

  function onSortUpdate(col: string, dir: SortDir) {
    setQueryCursor(0);
    setSortConfig({
      column: col,
      dir: dir
    });
  }
  
  const tableProps: IDogTableProps = {
    dogs: dogs,
    selectedDogs: selectedDogs,
    onDogSelected: onDogSelected
  }

  const paginationProps: IPaginationControlsProps = {
    totalRows: totalDogs,
    page: Math.floor(queryCursor / 25),
    pageSize: 25,
    onPageChange: function (offset: number): void {
      setQueryCursor(offset);
    }
  }

  const matchProps: IMatchButtonProps = {
    dogIds: selectedDogs,
    onClick: function (id: string): void {
      setMatchDog(selectedDogs[id]);
    }
  }
  
  return (
  <>
   {
    props.isAuthed &&
    <Box
      display="flex"
      justifyContent="space-between"
      flexDirection={'column'}
      alignItems="center"
      height={'100%'}
    >
    { !matchDog && 
    <>
      <DogSearch 
      isLoading={isLoading} 
      sortConfig={sortConfig} 
      queryCursor={queryCursor} 
      onDogSearch={onDogSearch}
      onViewSelected={() => {}}
      />
      <SortBar onUpdateSort={onSortUpdate}/>
    </>
    }
    { !matchDog && 
      <DogTableContainer 
        isLoading={isLoading} 
        tableProps={tableProps} 
        paginationProps={paginationProps} 
        matchButtonProps={matchProps}
        onSortUpdate={onSortUpdate}
      />
    }
    { matchDog &&
      <MatchResult dog={matchDog} onStartOver={() => {
        setMatchDog(undefined);
        setSelectedDogs({});
      }}/>}
    </Box>
   }
  </>);
}