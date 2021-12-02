import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(
  password: string = 'password',
  passwordConfirmation: string = 'passwordConfirmation'
): ValidatorFn {
  return (group: AbstractControl) => {
    if (
      !group.get(password)?.value ||
      !group.get(passwordConfirmation)?.value
    ) {
      return null;
    }
    return group.get(password)?.value !== group.get(passwordConfirmation)?.value
      ? { passwordMatch: true }
      : null;
  };
}
