import { SortConfig } from "../../constants/types";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton } from "@mui/material";

export interface ISortButtonProps {
  column: string;
  sortConfig?: SortConfig;
  onClick: () => void;
}

export function SortButton(props: ISortButtonProps) {
  return (
  <IconButton data-testid={`sort_${props.column}`}size={'small'} onClick={props.onClick}>
    {props.sortConfig && props.sortConfig.column === props.column ? 
      (props.sortConfig.dir === 'asc' ? 
        <KeyboardArrowUpIcon data-testid='sort-up'/> : 
        <KeyboardArrowDownIcon data-testid='sort-down '/>) :
      <UnfoldMoreIcon data-testid='sort-none'/>}
  </IconButton>);
}