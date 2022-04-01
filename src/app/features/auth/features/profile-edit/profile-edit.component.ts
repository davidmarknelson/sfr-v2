import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { apiUserConstants } from '@sfr/data-access/constants';
import { EditProfileGQL, ProfileGQL } from '@sfr/data-access/generated';
import { regexConstants } from '@sfr/shared/utils/constants';

@Component({
  selector: 'sfr-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrProfileEditComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly profileGQL: ProfileGQL,
    private readonly cd: ChangeDetectorRef,
    private readonly editProfileGQL: EditProfileGQL,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    this.errorMessage = null;

    this.editProfileGQL
      .mutate(
        {
          profile: {
            username: this.username.value,
            email: this.email.value,
          },
        },
        { errorPolicy: 'all' }
      )
      .subscribe(({ errors }) => {
        if (!errors) {
          this.router.navigate(['profile']);
        } else {
          this.errorMessage = errors[0].extensions?.response.message;
          this.cd.detectChanges();
        }
      });
  }

  private createForm(): void {
    this.profileGQL.fetch().subscribe(({ data }) => {
      this.form = this.fb.group({
        username: [
          data.profile.username,
          [
            Validators.required,
            Validators.maxLength(apiUserConstants.usernameMaxLength),
            Validators.minLength(apiUserConstants.usernameMinLength),
            Validators.pattern(regexConstants.notContainSpace),
          ],
        ],
        email: [data.profile.email, [Validators.required, Validators.email]],
      });
      this.cd.detectChanges();
    });
  }
}
