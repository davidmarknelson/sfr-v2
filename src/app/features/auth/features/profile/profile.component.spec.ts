import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { ProfileGQL } from '@sfr/data-access/generated';
import {
  SfrContainerUiModule,
  SfrLoaderUiModule,
  SfrPageTitleUiModule,
} from '@sfr/shared/ui/presentational';
import { of } from 'rxjs';
import { SfrProfileComponent } from './profile.component';

const profileData: any = {
  data: { profile: { id: 1, username: 'some-user', email: 'email@email.com' } },
};

describe('SfrProfileComponent', () => {
  let component: SfrProfileComponent;
  let fixture: ComponentFixture<SfrProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrProfileComponent],
      imports: [
        SfrLoaderUiModule,
        SfrContainerUiModule,
        SfrPageTitleUiModule,
        MatIconModule,
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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the user data', () => {
    expect(
      fixture.debugElement.query(By.css('p')).nativeElement.innerHTML
    ).toEqual('some-user');
  });
});
