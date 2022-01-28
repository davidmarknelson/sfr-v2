import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginGQL } from '@sfr/data-access/generated';
import { SfrAuthService } from '@sfr/shared/utils/services';

@Component({
  selector: 'sfr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrLoginComponent {
  form: FormGroup = this.createForm();
  errorMessage: string | null = null;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private loginGQL: LoginGQL,
    private authService: SfrAuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    this.errorMessage = null;

    this.loginGQL
      .fetch(
        {
          email: this.email.value,
          password: this.password.value,
        },
        { errorPolicy: 'all', fetchPolicy: 'no-cache' }
      )
      .subscribe((res) => {
        if (!res.errors) {
          this.authService.authenticate(res.data?.login.accessToken!);
          this.router.navigate(['profile']);
        } else {
          this.errorMessage = res.errors[0].extensions?.response.message;
          this.cd.detectChanges();
        }
      });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      email: '',
      password: '',
    });
  }
}
