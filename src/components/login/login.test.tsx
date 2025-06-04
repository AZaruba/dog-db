import Login from "./login";
import { render } from "@testing-library/react";

describe('Login', () => {
  const testLogin = jest.fn();

  it('Renders the component', () => {
    render(
      <Login 
       onLoginClicked={testLogin} 
       nameError={undefined}
       emailError={undefined}
      />
    );
  })
});