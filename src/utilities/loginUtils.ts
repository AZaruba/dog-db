
/*
Pre-checks a user-provide name to match an email format
*/
export function ValidateName(name: string): string | undefined {
  return name.length > 0 ? undefined : 'Please provide a valid name';
}

/*
Pre-checks a user-provide email to match an email format
*/
export function ValidateEmail(email: string): string | undefined {
  const match = /.*\@.*\..*/.exec(email);
  
  if (match === null) {
    return 'Please provide a valid email';
  }
  return undefined;
}