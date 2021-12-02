import { FormControl, FormGroup } from '@angular/forms';
import { passwordMatchValidator } from './password-match.validator';

describe('passwordMatchValidator', () => {
  it('should return an object if the passwords do not match', () => {
    const validator = passwordMatchValidator();
    expect(
      validator(
        new FormGroup({
          password: new FormControl('first'),
          passwordConfirmation: new FormControl('second'),
        })
      )
    ).toEqual({ passwordMatch: true });
  });

  it('should return null if the passwords match', () => {
    const validator = passwordMatchValidator();
    expect(
      validator(
        new FormGroup({
          password: new FormControl('match'),
          passwordConfirmation: new FormControl('match'),
        })
      )
    ).toEqual(null);
  });

  it('should return null if the password is an empty string', () => {
    const validator = passwordMatchValidator();
    expect(
      validator(
        new FormGroup({
          password: new FormControl(''),
          passwordConfirmation: new FormControl('match'),
        })
      )
    ).toEqual(null);
  });

  it('should return null if the password confirmation is an empty string', () => {
    const validator = passwordMatchValidator();
    expect(
      validator(
        new FormGroup({
          password: new FormControl('match'),
          passwordConfirmation: new FormControl(''),
        })
      )
    ).toEqual(null);
  });
});
