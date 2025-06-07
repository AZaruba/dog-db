import { useState } from "react";
import { IMatchButtonProps, MatchButton } from "../matchButton/matchButton";
import { IPaginationControlsProps, PaginationControls } from "../paginationControls/paginationControls";
import { Dog, SortDir } from "../../constants/types";
import { Box } from "@mui/material";
import { DogTable2, IDogTableProps } from "./dogTable2";
import { SortBar } from "../sortBar/sortBar";

export interface IDogTableContainerProps {
  isLoading: boolean;
  tableProps: IDogTableProps;
  paginationProps:  IPaginationControlsProps;
  matchButtonProps: IMatchButtonProps;
  onSortUpdate: (col: string, dir: SortDir) => void;
}
export function DogTableContainer(props: IDogTableContainerProps) {
  if (props.isLoading) {
    return (
      <Box
        padding='16px'
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={'70vh'}
        >
          <div>Loading Dogs...</div>
      </Box>
    );
  }
  
  return (
    <div style={{paddingBottom: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <DogTable2 {...props.tableProps}/>
      {props.paginationProps.totalRows > 0 && (<><PaginationControls {...props.paginationProps} />
      <MatchButton {...props.matchButtonProps} /></>)}
    </div>
  )
}