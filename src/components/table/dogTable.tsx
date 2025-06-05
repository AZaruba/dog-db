import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dog, DogFields, SortDir } from "../../constants/types";
import { GetDogs } from "../../utilities/fetchRequest";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export interface IDogTableProps {
  dogs: Dog[];
  setSortDir: Dispatch<SetStateAction<SortDir | undefined>>;
  setSortField: Dispatch<SetStateAction<SortDir | undefined>>
}
export function DogTable(props: IDogTableProps) {

  return (
    <Container maxWidth='lg'>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {
                Object.keys(DogFields).map((field) => {
                  // TODO: Add Sorting buttons here
                  return (
                  <TableCell variant='head' align="left">
                    {DogFields[field]}
                  </TableCell>)
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.dogs.map((dog) => {
                return (
                <TableRow>
                  {
                    Object.keys(DogFields).map((field) => {
                      if (field === 'img') {
                        return ( 
                          <TableCell align="left">
                            <img src={dog[field]} height={'150px'} alt={dog['name']}/>
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
