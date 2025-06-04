import { ValidateEmail, ValidateName } from "./loginUtils";


describe('Login Utilities', () => {
  it('Accepts an email', () => {
    expect(ValidateEmail('test@gmail.com')).toBeUndefined();
  });

  it('Accepts a name', () => {
    expect(ValidateName('Person Name')).toBeUndefined();
  });

  it('Does not accept entry that is not an email address', () => {
    expect(ValidateEmail('not an email')).toBeTruthy();
  });

  it('Does not accept an empty name', () => {
    expect(ValidateName('')).toBeTruthy();
  })
})