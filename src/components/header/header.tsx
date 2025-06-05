import { Button, Container, Stack } from "@mui/material";

export interface IHeaderProps {
  userAuthed: boolean | undefined;
  onLogout: () => void;
}

export function Header(props: IHeaderProps) {
  return(
    <Container maxWidth='xl'>
      <Stack direction='row' justifyContent={'space-around'} padding={'16px'}>
        Play Fetch - A Dog-Matchmaking Service by Andrew Zaruba
      {props.userAuthed && <Button onClick={props.onLogout}>Logout</Button>}
      </Stack>
    </Container>
  )
}