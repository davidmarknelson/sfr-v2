import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MockRouter } from '@sfr-testing/mocks';
import { UpdatePasswordGQL } from '@sfr/data-access/generated';
import {
  SfrAnnouncementUiModule,
  SfrContainerUiModule,
  SfrPageTitleUiModule,
} from '@sfr/shared/ui/presentational';
import { of } from 'rxjs';
import { SfrPasswordEditComponent } from './password-edit.component';

let editPasswordData: any = {
  data: { editPassword: { message: 'Password updated' } },
};

describe('PasswordEditComponent', () => {
  let component: SfrPasswordEditComponent;
  let fixture: ComponentFixture<SfrPasswordEditComponent>;
  let loader: HarnessLoader;
  let formFieldHarness: MatFormFieldHarness;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrPasswordEditComponent],
      imports: [
        SfrPageTitleUiModule,
        SfrContainerUiModule,
        MatIconModule,
        SfrAnnouncementUiModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: Router,
          useClass: MockRouter,
        },
        {
          provide: UpdatePasswordGQL,
          useValue: {
            mutate: () => {
              return of(editPasswordData);
            },
          },
        },
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrPasswordEditComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
      component.password.setValue('password!234');
      component.passwordConfirmation.setValue('password!234');
    });
    it('should successfully submit and navigate to the profile', () => {
      const routerSpy = jest.spyOn(router, 'navigate');
      fixture.debugElement
        .query(By.css('[type="submit"]'))
        .nativeElement.click();
      expect(routerSpy).toHaveBeenCalledWith(['profile']);
    });

    it('should show an error message in the form if the username is a duplicate', () => {
      editPasswordData = {
        errors: [
          {
            extensions: {
              response: {
                message: 'There was an error',
              },
            },
          },
        ],
      };
      const routerSpy = jest.spyOn(router, 'navigate');
      fixture.debugElement
        .query(By.css('[type="submit"]'))
        .nativeElement.click();
      expect(routerSpy).not.toHaveBeenCalled();
      expect(
        fixture.debugElement.query(By.css('sfr-announcement'))
      ).toBeTruthy();
      expect(component.errorMessage).toEqual('There was an error');
    });
  });
});
