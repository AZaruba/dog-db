import { useState } from "react";
import Login from "../src/components/login/login";
import { Authenticate } from "../src/utilities/fetchRequest";
import { ValidateEmail, ValidateName } from "../src/utilities/loginUtils";
import { DogSearch } from "../src/components/search/search";

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
  }

  return (
    <>
      {userAuth && (<DogSearch/>)}
      {!userAuth && (
        <Login
         nameError={nameError}
         emailError={emailError}
         onLoginClicked={onLogin}
        />
      )}
    </>
  );
}