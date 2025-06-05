import { Container, Stack } from "@mui/material";

export function Header() {
  return(
    <Container maxWidth='xl'>
      <Stack direction='row' justifyContent={'space-around'} padding={'16px'}>
        Andrew's Cool Dog Zone - Do Not Tell Casey Or He Will Be Jealous
      </Stack>
    </Container>
  )
}