import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class SfrErrorStateMatcher implements ErrorStateMatcher {
  constructor(private formErrors: string[]) {}

  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(
      control &&
      (control.dirty || control.touched) &&
      (control.invalid || this.formErrors.some((err) => form?.hasError(err)))
    );
  }
}
