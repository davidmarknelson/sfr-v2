import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MockRouter } from '@sfr-testing/mocks';
import { apiUserConstants } from '@sfr/data-access/constants';
import { EditProfileGQL, ProfileGQL } from '@sfr/data-access/generated';
import {
  SfrAnnouncementUiModule,
  SfrContainerUiModule,
  SfrLoaderUiModule,
  SfrPageTitleUiModule,
} from '@sfr/shared/ui/presentational';
import { of } from 'rxjs';
import { SfrProfileEditComponent } from './profile-edit.component';

let profileData: any = {
  data: { profile: { id: 1, username: 'username', email: 'email@email.com' } },
};
let editProfileData: any = {
  data: {
    editProfile: {
      id: 1,
      username: 'new-username',
      email: 'new-email@email.com',
    },
  },
};

describe('ProfileEditComponent', () => {
  let component: SfrProfileEditComponent;
  let fixture: ComponentFixture<SfrProfileEditComponent>;
  let loader: HarnessLoader;
  let formFieldHarness: MatFormFieldHarness;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrProfileEditComponent],
      imports: [
        SfrAnnouncementUiModule,
        MatFormFieldModule,
        SfrPageTitleUiModule,
        SfrLoaderUiModule,
        SfrContainerUiModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ProfileGQL,
          useValue: {
            fetch: () => {
              return of(profileData);
            },
          },
        },
        {
          provide: EditProfileGQL,
          useValue: {
            mutate: () => {
              return of(editProfileData);
            },
          },
        },
        {
          provide: Router,
          useClass: MockRouter,
        },
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrProfileEditComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  describe('Submit', () => {
    beforeEach(() => {
      component.username.setValue('new-username');
      component.email.setValue('new-email@email.com');
    });
    it('should successfully submit and navigate to the profile', () => {
      const routerSpy = jest.spyOn(router, 'navigate');
      fixture.debugElement
        .query(By.css('[type="submit"]'))
        .nativeElement.click();
      expect(routerSpy).toHaveBeenCalled();
    });

    it('should show an error message in the form if the username is a duplicate', () => {
      editProfileData = {
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
      fixture.debugElement
        .query(By.css('[type="submit"]'))
        .nativeElement.click();
      expect(routerSpy).not.toHaveBeenCalled();
      expect(
        fixture.debugElement.query(By.css('sfr-announcement'))
      ).toBeTruthy();
      expect(component.errorMessage).toEqual(
        'An account with this email or username already exists'
      );
    });
  });
});
