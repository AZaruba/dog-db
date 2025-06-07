import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Tutorial } from "../tutorial/tutorial";
import styles from '../../style/global.module.scss';

export interface ILoginProps {
  nameError: string | undefined;
  emailError: string | undefined;
  onLoginClicked: (name: string, email: string) => void;
}

export default function Login(props: ILoginProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  return (
    <Box
    padding='16px'
    display={'flex'}
    width={'100vh'}
    flexDirection={'column'}
    alignItems='center'
    alignSelf={'center'}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        props.onLoginClicked(name, email);
      }
    }}
    >
      <Box
        padding='16px'
        display="flex"
        justifyContent="start"
        flexDirection={'column'}
        alignItems="center"
      >
        <Stack justifyContent={'center'}>
          <TextField
            data-testid='nameEntry'
            error={props.nameError !== undefined}
            helperText={props.nameError}
            style={{margin: '8px'}}
            id="outlined-basic" 
            label="Name" 
            value={name} 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
            variant="outlined"
          />
          <TextField 
            data-testid='emailEntry'
            error={props.emailError !== undefined}
            helperText={props.emailError}
            style={{margin: '8px'}}
            id="outlined-basic" 
            label="E-Mail" 
            value={email} 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            variant="outlined"
          />
          <Button 
            data-testid='loginButton'
            style={{
              width: '280px',
              margin: '16px'
            }}
            className={styles.loginButton}
            onClick={() => {
              props.onLoginClicked(name, email);
            }}
          >
            Login!
          </Button>
        </Stack>
      </Box>
      <Box 
      padding='16px'
      display="flex"
      justifyContent="center"
      flexDirection={'column'}
      alignItems="start"
      width={'50vw'}
      >
        <Tutorial/>
      </Box>
    
    </Box>
  );
}