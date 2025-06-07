import { Dog, SortConfig, SortDir } from "../../constants/types";
import { Box, Grid } from "@mui/material";
import { DogCard } from "../dogCard/dogCard";
import { getWindowDimension } from "../../utilities/getWindowDimension";

export interface IDogTableProps {
  dogs: Dog[];
  selectedDogs: Record<string, Dog>;
  sortConfig?: SortConfig;
  onDogSelected: (dog: Dog, isSelected: boolean) => void;
}
export function DogTable2(props: IDogTableProps) {
  const windowWidth = getWindowDimension();

  if (props.dogs.length === 0) {
    return (
      <Box
      padding='16px'
      display="flex"
      justifyContent="start"
      flexDirection={'column'}
      alignItems="center"
      width={'80vw'}
    >
      No dogs found. Please adjust your search settings.
    </Box>
    );
  }

  const splitList: Dog[][] = props.dogs.reduce((splitList: Dog[][], item, index) => { 
    const chunkIndex = Math.floor(index/Math.floor((windowWidth*0.8)/200));
    if(!splitList[chunkIndex]) {
      splitList[chunkIndex] = [];
    }

    splitList[chunkIndex].push(item);
    return splitList
  }, []);

  return (
    <Box
      padding='16px'
      display="flex"
      justifyContent="space-around"
      flexDirection={'column'}
      alignItems="center"
      width={'90vw'}
    >
      <Grid container spacing={2} justifyContent={'center'}>
        {
          splitList.map((list, index) => {
            return (
              <Grid container spacing={2} key={`dogs-row-${index}`}>
                {
                  list.map((dog) => {
                    return (
                      <DogCard
                       key={`dog-card-${dog.id}`}
                       dog={dog}
                       selected={Object.keys(props.selectedDogs).indexOf(dog.id) > -1}
                       onSelected={props.onDogSelected}
                      />
                    )
                  })
                }
              </Grid>
            )
          })
        }
      </Grid>
    </Box>
  )
}
