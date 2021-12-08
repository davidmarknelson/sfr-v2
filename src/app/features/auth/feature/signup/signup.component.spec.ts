import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
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

let signupData: any;

describe('SignupComponent', () => {
  let component: SfrSignupComponent;
  let fixture: ComponentFixture<SfrSignupComponent>;

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
          useValue: {
            authenticate: jest.fn(() => {
              return;
            }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
