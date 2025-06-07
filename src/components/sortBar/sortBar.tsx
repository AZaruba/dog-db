import { Box, Button, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { SortDir } from "../../constants/types";
import styles from '../../style/global.module.scss';

export interface ISortBarProps {
  onUpdateSort: (col?: string, dir?: SortDir) => void;
}

const options: Record<string, string> = {
  'age' : 'Age',
  'breed': 'Breed',
  'name': 'Name'
}
export function SortBar(props: ISortBarProps) {
  const [sortCol, setSortCol] = useState<string>('breed');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  useEffect(() => {
    props.onUpdateSort(sortCol, sortDir);
  }, [sortCol, sortDir]);
  
  return (
  <Box
   padding={'8px'}
   gap={'16px'}
   display={'flex'}
   flexDirection={'row'}
   justifyContent={'flex-start'}
   alignContent={'baseline'}
  >
    <Box alignContent={'space-around'}>Sort by:{' '}</Box>
    <Select
     key={'sort-col'}
     size='small'
     style={{width: '120px'}}
     value={sortCol}
     onChange={(e) => {
      setSortCol(e.target.value as string);
     }}
    >
      {
        Object.keys(options).map((key) => {
          return <MenuItem value={key}>{options[key]}</MenuItem>
        })
      }
    </Select>
    <Select
     key={'sort-dir'}
     size='small'
     style={{width: '150px'}}
     value={sortDir}
     onChange={(e) => {
      setSortDir(e.target.value as SortDir);
     }}
    >
      <MenuItem value={'asc'}>Ascending</MenuItem>
      <MenuItem value={'desc'}>Descending</MenuItem>
    </Select>
    <Button className={styles.secondaryButton} onClick={() => {
      setSortCol('breed');
      setSortDir('asc');
    }}>
      Reset Sort
    </Button>
  </Box>
  );
}