import { useState } from "react";
import Login from "../src/components/login/login";
import { Authenticate, Logout } from "../src/utilities/fetchRequest";
import { ValidateEmail, ValidateName } from "../src/utilities/loginUtils";
import { DogPage } from "../src/components/dogPage/dogPage";
import { Header } from "../src/components/header/header";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Stack } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'PipersPlayroomRegular'
    ].join(',')
  }
});

export default function Root() {
  const [userAuth, setUserAuth] = useState<boolean>();
  const [nameError, setNameError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();

  function onLogin(name: string, email: string) {
    const nameResult = ValidateName(name);
    const emailResult = ValidateEmail(email);
    setNameError(nameResult);
    setEmailError(emailResult);

    if (!nameResult && !emailResult) {
      Authenticate(name, email).then((result) => {
        setUserAuth(result);
      });
    }
  }

  function onLogout() {
    setUserAuth(false);
    Logout();
  }

  function onAuthCheck(code: number) {
    setUserAuth(code === 200);
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Stack direction='column'>
          <Header
           userAuthed={userAuth}
           onLogout={onLogout}
          />
          <DogPage 
           onAuthCheck={onAuthCheck} 
           isAuthed={userAuth}
          />
          {userAuth === false && (
            <Login
             nameError={nameError}
             emailError={emailError}
             onLoginClicked={onLogin}
            />
          )}
        </Stack>
      </ThemeProvider>
    </>
  );
}