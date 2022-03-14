import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockAuthService } from '@sfr-testing/mocks';
import { SfrAuthService } from '@sfr/shared/utils/services';
import { of } from 'rxjs';
import { SfrFooterComponent } from './footer.component';

describe('SfrFooterComponent', () => {
  let fixture: ComponentFixture<SfrFooterComponent>;
  let authService: SfrAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrFooterComponent],
      providers: [
        {
          provide: SfrAuthService,
          useClass: MockAuthService,
        },
      ],
    }).compileComponents();
    authService = TestBed.inject(SfrAuthService);
  });

  describe('authenticated', () => {
    let authSpy: any;

    beforeEach(() => {
      authSpy = jest
        .spyOn(authService, 'isAuthenticated$', 'get')
        .mockReturnValue(of(true));
      fixture = TestBed.createComponent(SfrFooterComponent);
      fixture.detectChanges();
    });

    it('should show the signup and login links', () => {
      expect(authSpy).toBeCalled();
      expect(
        fixture.debugElement.query(By.css('[routerLink="/signup"]'))
      ).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('[routerLink="/login"]'))
      ).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('[routerLink="/profile"]'))
      ).toBeTruthy();
    });
  });

  describe('unauthenticated', () => {
    let authSpy: any;

    beforeEach(() => {
      authSpy = jest
        .spyOn(authService, 'isAuthenticated$', 'get')
        .mockReturnValue(of(false));
      fixture = TestBed.createComponent(SfrFooterComponent);
      fixture.detectChanges();
    });

    it('should show the signup and login links', () => {
      expect(authSpy).toBeCalled();
      expect(
        fixture.debugElement.query(By.css('[routerLink="/signup"]'))
      ).toBeTruthy();
      expect(
        fixture.debugElement.query(By.css('[routerLink="/login"]'))
      ).toBeTruthy();
      expect(
        fixture.debugElement.query(By.css('[routerLink="/profile"]'))
      ).toBeFalsy();
    });
  });
});
