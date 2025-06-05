import { SetStateAction, useState } from "react";
import { DogTable } from "../table/dogTable";
import { DogSearch } from "../search/search";
import { GetDogs, GetDogsFromIds } from "../../utilities/fetchRequest";
import { Dog, SortDir } from "../../constants/types";

export function DogPage() {
  const [sortDir, setSortDir] = useState<SortDir>();
  const [sortField, setSortField] = useState<string>();
  const [queryCursor, setQueryCursor] = useState<string>();
  const [dogs, setDogs] = useState<Dog[]>([]);

  function onDogSearch(
    breedList: string[], 
    ageMin: number | null, 
    ageMax: number | null, 
    zipCodes?: string[]
  ) {
    let sortString: string | undefined;

    if (sortField && sortDir) {
      sortString = `${sortField}:${sortDir}`;
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
          console.log(result);
          setDogs(result);
        })
      }
    });
  }
  
  return (
  <>
    <DogSearch onDogSearch={onDogSearch}/>
    <DogTable dogs={dogs} setSortDir={setSortDir} setSortField={setSortField}/>
  </>);
}