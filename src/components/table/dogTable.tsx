import { Dispatch, SetStateAction } from "react";
import { Dog, DogFields, SortConfig, SortDir } from "../../constants/types";
import { Checkbox, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { SortButton } from "../sortButton/sortButton";

export interface IDogTableProps {
  dogs: Dog[];
  selectedDogs: string[];
  sortConfig?: SortConfig;
  onDogSelected: (id: string, isSelected: boolean) => void;
  onSortClick: (col: string, dir?: SortDir) => void;
}
export function DogTable(props: IDogTableProps) {
  function onSortClick(col: string) {
    if (props.sortConfig && props.sortConfig.column === col) {
      const currentDir = props.sortConfig.dir;
      if (currentDir === 'desc') {
        props.onSortClick(col, undefined);
      } else {
        props.onSortClick(col, 'desc');
      }
    } else {
      props.onSortClick(col, 'asc');
    }
  }

  return (
    <Container maxWidth='lg'>
      <TableContainer sx={{ maxWidth: '80vw', maxHeight: '70vh', overflowY: 'scroll' }}>
        <Table stickyHeader >
          <TableHead>
            <TableRow >
              <TableCell variant="head" align="left">
                Selected
              </TableCell>
              {
                Object.keys(DogFields).map((field) => {
                  // TODO: Add Sorting buttons here
                  return (
                  <TableCell variant='head' align="left">
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                      {DogFields[field]}
                      <SortButton 
                        column={field}
                        sortConfig={props.sortConfig}
                        onClick={() => onSortClick(field)}
                      />
                    </Stack>
                  </TableCell>
                  )
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.dogs.map((dog) => {
                return (
                <TableRow>
                  <TableCell align="left">
                    <Checkbox 
                     key={`select_${dog.id}`}
                     checked={props.selectedDogs.indexOf(dog.id) > -1}
                     onChange={(e) => {
                      props.onDogSelected(dog.id, e.target.checked);
                    }}/>
                  </TableCell>
                  {
                    Object.keys(DogFields).map((field) => {
                      if (field === 'img') {
                        return ( 
                          <TableCell align="left"
                            key={`${field}_${dog.id}`}>
                            <img src={dog[field]} height={'100px'} alt={dog['name']}/>
                          </TableCell>
                        )
                      }
                      return <TableCell align="left">{dog[field]}</TableCell>
                    })
                  }
                </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
