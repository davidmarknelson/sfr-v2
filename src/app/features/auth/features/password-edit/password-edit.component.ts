import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { apiUserConstants } from '@sfr/data-access/constants';
import { UpdatePasswordGQL } from '@sfr/data-access/generated';
import { SfrErrorStateMatcher } from '@sfr/shared/utils/error-state-matchers';
import { SfrValidators } from '@sfr/shared/utils/validators';

@Component({
  selector: 'sfr-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrPasswordEditComponent {
  form: FormGroup;
  hidePassword = true;
  hidePasswordConfirmation = true;
  errorMatcher = new SfrErrorStateMatcher(['passwordMatch']);
  errorMessage: string | null = null;

  constructor(
    private readonly updatePasswordGQL: UpdatePasswordGQL,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef
  ) {
    this.form = this.createForm();
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
  get passwordConfirmation(): FormControl {
    return this.form.get('passwordConfirmation') as FormControl;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  togglePasswordConfirmationVisibility(): void {
    this.hidePasswordConfirmation = !this.hidePasswordConfirmation;
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    this.errorMessage = null;

    this.updatePasswordGQL
      .mutate(
        {
          password: {
            password: this.password.value,
          },
        },
        { errorPolicy: 'all', fetchPolicy: 'no-cache' }
      )
      .subscribe((res) => {
        if (!res.errors) {
          this.router.navigate(['profile']);
        } else {
          this.errorMessage = res.errors[0].extensions?.response.message;
          this.cd.detectChanges();
        }
      });
  }

  private createForm(): FormGroup {
    return this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(new RegExp(apiUserConstants.passwordRegex)),
          ],
        ],
        passwordConfirmation: ['', Validators.required],
      },
      {
        validators: SfrValidators.passwordMatch(),
      }
    );
  }
}
