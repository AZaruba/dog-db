import { Pagination, Stack } from "@mui/material";

export interface IPaginationControlsProps {
  totalRows: number;
  page: number;
  pageSize: number;
  onPageChange: (offset: number) => void;
}

export function PaginationControls(props: IPaginationControlsProps) {
  const pageCount = Math.floor(props.totalRows / props.pageSize);

  return (
  <Stack direction={'row'} justifyContent={'end'} padding='16px' width={'80vw'}>
    <Pagination 
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