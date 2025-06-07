import { Pagination, Stack } from "@mui/material";

export interface IPaginationControlsProps {
  totalRows: number;
  page: number;
  pageSize: number;
  onPageChange: (offset: number) => void;
}

export function PaginationControls(props: IPaginationControlsProps) {
  const pageCount = Math.ceil(props.totalRows / props.pageSize);

  return (
  <Stack direction={'row'} justifyContent={'start'} width={'100%'} padding='16px'>
    <Pagination 
      style={{marginLeft: '20%'}}
      page={props.page + 1}
      count={pageCount} 
      variant="outlined" 
      shape="rounded"
      onChange={(_e, page) => {
        props.onPageChange((page -1) * props.pageSize);
      }}
    />
  </Stack>
  );
}