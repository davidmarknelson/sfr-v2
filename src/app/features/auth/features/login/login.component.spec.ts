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
import { LoginGQL } from '@sfr/data-access/generated';
import {
  SfrUiAnnouncementModule,
  SfrUiContainerModule,
  SfrUiPageTitleModule,
} from '@sfr/shared/ui';
import { SfrRoundedButtonModule } from '@sfr/shared/utils/directives';
import { SfrAuthService } from '@sfr/shared/utils/services';
import { of } from 'rxjs';
import { SfrLoginComponent } from './login.component';

let loginData: any = {
  data: { login: { accessToken: 'token' } },
};

describe('SfrLoginComponent', () => {
  let component: SfrLoginComponent;
  let fixture: ComponentFixture<SfrLoginComponent>;
  let loader: HarnessLoader;
  let formFieldHarness: MatFormFieldHarness;
  let router: Router;
  let authService: SfrAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrLoginComponent],
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
          provide: LoginGQL,
          useValue: {
            fetch: () => {
              return of(loginData);
            },
          },
        },
        {
          provide: SfrAuthService,
          useValue: {
            authenticate: jest.fn(() => {
              return;
            }),
          },
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

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrLoginComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Password and password confirmation input types', () => {
    it('should initially start as a password type for the password input', async () => {
      expect(component.hidePassword).toEqual(true);
    });

    it('should have a function that changes the hidePassword and hidePasswordConfirmation properties', () => {
      component.togglePasswordVisibility();
      expect(component.hidePassword).toEqual(false);
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

    it('should show that it is required', async () => {
      component.email.setValue('');
      component.email.markAsTouched();
      fixture.detectChanges();
      expect((component.email.errors || {})['required']).toBeTruthy();
      expect(await formFieldHarness.getTextErrors()).toEqual([
        'This field is requiredEmail',
      ]);
    });

    describe('Password', () => {
      it('should show that it is required', async () => {
        formFieldHarness = await loader.getHarness(
          MatFormFieldHarness.with({
            floatingLabelText: 'Password *',
          })
        );
        component.password.setValue('');
        component.password.markAsTouched();
        fixture.detectChanges();
        expect((component.password.errors || {})['required']).toBeTruthy();
        expect(await formFieldHarness.getTextErrors()).toEqual([
          'This field is requiredPassword',
        ]);
      });
    });

    describe('Submit', () => {
      beforeEach(() => {
        component.email.setValue('email@email.com');
        component.password.setValue('password!234');
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

      it('should show an error message in the form if the username or email is incorrect', () => {
        loginData = {
          errors: [
            {
              extensions: {
                response: {
                  message: 'Email or password is incorrect',
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
          'Email or password is incorrect'
        );
      });
    });
  });
});
