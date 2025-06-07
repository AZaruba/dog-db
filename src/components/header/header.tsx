import { Button, Container, Stack } from "@mui/material";
import styles from '../../style/global.module.scss';

export interface IHeaderProps {
  userAuthed: boolean | undefined;
  onLogout: () => void;
}

export function Header(props: IHeaderProps) {
  return(
    <Container 
     maxWidth='xl' 
     className={styles.headerStyle}>
      <Stack direction='row' justifyContent={'space-around'} height={'100%'} padding={'16px'} className={styles.pipersPlayroom}>
        <div style={{alignContent: 'center'}}>Play Fetch - A Dog-Matchmaking Service by Andrew Zaruba</div>
      {props.userAuthed && <Button onClick={props.onLogout}>Logout</Button>}
      </Stack>
    </Container>
  )
}