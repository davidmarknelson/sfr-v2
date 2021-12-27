import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockAuthService } from '@sfr-testing/mocks';
import { apiUserConstants } from '@sfr/data-access/constants';
import { SignupGQL } from '@sfr/data-access/generated';
import {
  SfrUiAnnouncementModule,
  SfrUiContainerModule,
  SfrUiPageTitleModule,
} from '@sfr/shared/ui';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
import { SfrAuthService } from '@sfr/shared/utils/services';
import { of } from 'rxjs';
import { SfrSignupComponent } from './signup.component';

let signupData: any = {
  data: { signup: { accessToken: 'token' } },
};

describe('SignupComponent', () => {
  let component: SfrSignupComponent;
  let fixture: ComponentFixture<SfrSignupComponent>;
  let loader: HarnessLoader;
  let formFieldHarness: MatFormFieldHarness;
  let router: Router;
  let authService: SfrAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrSignupComponent],
      imports: [
        RouterTestingModule,
        SfrUiContainerModule,
        SfrUiPageTitleModule,
        SfrRoundedButtonModule,
        SfrUiAnnouncementModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
        {
          provide: SignupGQL,
          useValue: {
            mutate: () => {
              return of(signupData);
            },
          },
        },
        {
          provide: SfrAuthService,
          useClass: MockAuthService,
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compileComponents();
    router = TestBed.inject<Router>(Router);
    authService = TestBed.inject<SfrAuthService>(SfrAuthService);
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SfrSignupComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Password and password confirmation input types', () => {
    it('should initially start as a password type for the password input', async () => {
      expect(component.hidePassword).toEqual(true);
    });

    it('should initially start as a password type for the password confirmation input', async () => {
      expect(component.hidePasswordConfirmation).toEqual(true);
    });

    it('should have a function that changes the hidePassword and hidePasswordConfirmation properties', () => {
      component.togglePasswordVisibility();
      component.togglePasswordConfirmationVisibility();
      expect(component.hidePassword).toEqual(false);
      expect(component.hidePasswordConfirmation).toEqual(false);
    });
  });

  describe('Username', () => {
    beforeEach(async () => {
      formFieldHarness = await loader.getHarness(
        MatFormFieldHarness.with({
          floatingLabelText: 'Username *',
        })
      );
    });

    it(`should show an error if the username is shorter than ${apiUserConstants.usernameMinLength} characters`, async () => {
      component.username.setValue('1234');
      component.username.markAsTouched();
      fixture.detectChanges();
      expect((component.username.errors || {})['minlength']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        `Username must be at least ${apiUserConstants.usernameMinLength} characters`,
      ]);
    });

    it(`should show an error if the username is longer than ${apiUserConstants.usernameMaxLength} characters`, async () => {
      let longText = 'a'.padEnd(26, 'a');
      component.username.setValue(longText);
      component.username.markAsTouched();
      fixture.detectChanges();
      formFieldHarness = await loader.getHarness(
        MatFormFieldHarness.with({
          floatingLabelText: 'Username *',
        })
      );
      fixture.detectChanges();
      expect((component.username.errors || {})['maxlength']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        `Username must not be longer than ${apiUserConstants.usernameMaxLength} characters`,
      ]);
    });

    it('should show that it is required', async () => {
      component.username.setValue('');
      component.username.markAsTouched();
      fixture.detectChanges();
      expect((component.username.errors || {})['required']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'This field is requiredUsername',
      ]);
    });

    it('should show an error if there is a space', async () => {
      component.username.setValue('1234 1234');
      component.username.markAsTouched();
      fixture.detectChanges();
      expect((component.username.errors || {})['pattern']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'Username must not contain a space',
      ]);
    });
  });

  describe('Email', () => {
    beforeEach(async () => {
      formFieldHarness = await loader.getHarness(
        MatFormFieldHarness.with({
          floatingLabelText: 'Email *',
        })
      );
    });

    it('should show an error if the email is not an email', async () => {
      component.email.setValue('email@@');
      component.email.markAsTouched();
      fixture.detectChanges();
      expect((component.email.errors || {})['email']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'This must be a valid email',
      ]);
    });

    it('should show that it is required', async () => {
      component.email.setValue('');
      component.email.markAsTouched();
      fixture.detectChanges();
      expect((component.email.errors || {})['required']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'This field is requiredEmail',
      ]);
    });
  });

  describe('Password', () => {
    beforeEach(async () => {
      formFieldHarness = await loader.getHarness(
        MatFormFieldHarness.with({
          floatingLabelText: 'Password *',
        })
      );
    });

    it('should show that it is required', async () => {
      component.password.setValue('');
      component.password.markAsTouched();
      fixture.detectChanges();
      expect((component.password.errors || {})['required']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'This field is requiredPassword',
      ]);
    });

    it('should show an error if the password is shorter than 12 characters', async () => {
      component.password.setValue('aaaa1111@@@');
      component.password.markAsTouched();
      fixture.detectChanges();
      expect((component.password.errors || {})['pattern']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'Password must contain a letter, a number, a special character, and be at least 12 characters long',
      ]);
    });

    it('should show an error if the password does not have any numbers', async () => {
      component.password.setValue('aaaa@@@@bbbb');
      component.password.markAsTouched();
      fixture.detectChanges();
      expect((component.password.errors || {})['pattern']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'Password must contain a letter, a number, a special character, and be at least 12 characters long',
      ]);
    });

    it('should show an error if the password does not have any letters', async () => {
      component.password.setValue('1111@@@@2222');
      component.password.markAsTouched();
      fixture.detectChanges();
      expect((component.password.errors || {})['pattern']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'Password must contain a letter, a number, a special character, and be at least 12 characters long',
      ]);
    });

    it('should not have any errors with a valid password', async () => {
      component.password.setValue('password!234');
      component.password.markAsTouched();
      fixture.detectChanges();
      expect(component.password.errors).toBeFalsy();
      expect(await formFieldHarness.hasErrors()).toEqual(false);
    });

    it('should show an error if the passwords do not match', async () => {
      component.password.setValue('password!234');
      component.password.markAsTouched();
      component.passwordConfirmation.setValue('no match');
      component.passwordConfirmation.markAsTouched();
      fixture.detectChanges();
      expect((component.form.errors || {})['passwordMatch']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'Passwords must match',
      ]);
    });
  });

  describe('Password Confirmation', () => {
    beforeEach(async () => {
      formFieldHarness = await loader.getHarness(
        MatFormFieldHarness.with({
          floatingLabelText: 'Password Confirmation *',
        })
      );
    });

    it('should show that it is required', async () => {
      component.passwordConfirmation.setValue('');
      component.passwordConfirmation.markAsTouched();
      fixture.detectChanges();
      expect(
        (component.passwordConfirmation.errors || {})['required']
      ).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'This field is requiredPassword Confirmation',
      ]);
    });

    it('should show an error if the passwords do not match', async () => {
      component.password.setValue('password!234');
      component.password.markAsTouched();
      component.passwordConfirmation.setValue('no match');
      component.passwordConfirmation.markAsTouched();
      fixture.detectChanges();
      expect((component.form.errors || {})['passwordMatch']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'Passwords must match',
      ]);
    });
  });

  describe('Submit', () => {
    beforeEach(() => {
      component.username.setValue('username');
      component.email.setValue('email@email.com');
      component.password.setValue('password!234');
      component.passwordConfirmation.setValue('password!234');
    });
    it('should successfully submit and navigate to the profile', () => {
      const routerSpy = jest.spyOn(router, 'navigate');
      const authSpy = jest.spyOn(authService, 'authenticate');
      fixture.debugElement
        .query(By.css('[type="submit"]'))
        .nativeElement.click();
      expect(routerSpy).toHaveBeenCalled();
      expect(authSpy).toHaveBeenCalledWith('token');
    });

    it('should show an error message in the form if the username is a duplicate', () => {
      signupData = {
        errors: [
          {
            extensions: {
              response: {
                message:
                  'An account with this email or username already exists',
              },
            },
          },
        ],
      };
      const routerSpy = jest.spyOn(router, 'navigate');
      const authSpy = jest.spyOn(authService, 'authenticate');
      fixture.debugElement
        .query(By.css('[type="submit"]'))
        .nativeElement.click();
      expect(routerSpy).not.toHaveBeenCalled();
      expect(authSpy).not.toHaveBeenCalledWith('token');
      expect(
        fixture.debugElement.query(By.css('sfr-announcement'))
      ).toBeTruthy();
      expect(component.errorMessage).toEqual(
        'An account with this email or username already exists'
      );
    });
  });
});
