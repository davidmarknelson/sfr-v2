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
import { SignupGQL } from '@sfr/data-access/generated';
import { regexConstants } from '@sfr/shared/utils/constants';
import { SfrErrorStateMatcher } from '@sfr/shared/utils/error-state-matchers';
import { SfrAuthService } from '@sfr/shared/utils/services';
import { SfrValidators } from '@sfr/shared/utils/validators';

@Component({
  selector: 'sfr-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrSignupComponent {
  form: FormGroup = this.createForm();
  hidePassword = true;
  hidePasswordConfirmation = true;
  errorMatcher = new SfrErrorStateMatcher(['passwordMatch']);
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private signupGQL: SignupGQL,
    private router: Router,
    private cd: ChangeDetectorRef,
    private authService: SfrAuthService
  ) {}

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }
  get email(): FormControl {
    return this.form.get('email') as FormControl;
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
    this.signupGQL
      .mutate(
        {
          user: {
            username: this.username.value,
            email: this.email.value,
            password: this.password.value,
          },
        },
        { errorPolicy: 'all', fetchPolicy: 'no-cache' }
      )
      .subscribe((res) => {
        if (!res.errors) {
          this.authService.authenticate(res.data?.signup.accessToken!);
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
        username: [
          '',
          [
            Validators.required,
            Validators.maxLength(apiUserConstants.usernameMaxLength),
            Validators.minLength(apiUserConstants.usernameMinLength),
            Validators.pattern(regexConstants.notContainSpace),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
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
