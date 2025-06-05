import { Button, Container, Stack, TextField } from "@mui/material";
import { useState } from "react";

export interface ILoginProps {
  nameError: string | undefined;
  emailError: string | undefined;
  onLoginClicked: (name: string, email: string) => void;
}

export default function Login(props: ILoginProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  return (
    <Container maxWidth='sm'>
      <Stack>
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
          variant='outlined'
          onClick={() => {
            props.onLoginClicked(name, email);
          }}
        >
          Login!
        </Button>
      </Stack>
    </Container>
  );
}