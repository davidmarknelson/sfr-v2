import { TestBed } from '@angular/core/testing';
import { RefreshTokenGQL } from '@sfr/data-access/generated';
import { authTestingHelpers } from '@testing';
import { Apollo } from 'apollo-angular';
import { of, throwError } from 'rxjs';
import { authConstants } from '../../constants';
import { SfrAuthService } from './auth.service';

let refreshTokenGqlReturn: any = of({
  data: { refreshToken: { accessToken: 'token' } },
});

describe('AuthService', () => {
  let authService: SfrAuthService;
  let apollo: Apollo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RefreshTokenGQL,
          useValue: {
            fetch: () => {
              return refreshTokenGqlReturn;
            },
          },
        },
        {
          provide: Apollo,
          useValue: {
            client: {
              stop: jest.fn(() => {
                return;
              }),
              clearStore: jest.fn().mockResolvedValue(null),
            },
          },
        },
      ],
    });
    authService = TestBed.inject(SfrAuthService);
    apollo = TestBed.inject(Apollo);
  });

  describe('refreshOrClearToken$', () => {
    it('should refresh the oken and login the user', (done) => {
      const isTokenExpiredSpy = jest
        .spyOn(authService, 'isTokenExpired')
        .mockReturnValue(false);
      const authenticateSpy = jest.spyOn(authService, 'authenticate');
      authService.refreshOrClearToken$().subscribe((result) => {
        expect(isTokenExpiredSpy).toHaveBeenCalled();
        expect(authenticateSpy).toHaveBeenCalled();
        expect(result).toEqual('token');
        done();
      });
    });

    it('should clear the auth state if the token is expired', (done) => {
      const isTokenExpiredSpy = jest
        .spyOn(authService, 'isTokenExpired')
        .mockReturnValue(true);
      const localStorageSpy = jest.spyOn(
        window.localStorage.__proto__,
        'removeItem'
      );
      authService.refreshOrClearToken$().subscribe((result) => {
        expect(isTokenExpiredSpy).toHaveBeenCalled();
        expect(localStorageSpy).toHaveBeenCalledWith(
          authConstants.authTokenName
        );
        expect(result).toEqual(null);
        done();
      });
    });

    it('should clear the auth state if there is a BE error', (done) => {
      refreshTokenGqlReturn = throwError('error');
      const isTokenExpiredSpy = jest
        .spyOn(authService, 'isTokenExpired')
        .mockReturnValue(false);
      const localStorageSpy = jest.spyOn(
        window.localStorage.__proto__,
        'removeItem'
      );
      authService.refreshOrClearToken$().subscribe((result) => {
        expect(isTokenExpiredSpy).toHaveBeenCalled();
        expect(localStorageSpy).toHaveBeenCalledWith(
          authConstants.authTokenName
        );
        expect(result).toEqual(null);
        done();
      });
    });
  });

  describe('isTokenExpired', () => {
    it('should return true with a token that is not expired', () => {
      const localStorageSpy = jest
        .spyOn(window.localStorage.__proto__, 'getItem')
        .mockReturnValue(authTestingHelpers.validJwt);
      const validToken = authService.isTokenExpired();
      expect(validToken).toEqual(true);
      expect(localStorageSpy).toHaveBeenCalledWith(authConstants.authTokenName);
    });

    it('should return false with an expired token', () => {
      const localStorageSpy = jest
        .spyOn(window.localStorage.__proto__, 'getItem')
        .mockReturnValue(authTestingHelpers.expiredJwt);
      const validToken = authService.isTokenExpired();
      expect(validToken).toEqual(false);
      expect(localStorageSpy).toHaveBeenCalledWith(authConstants.authTokenName);
    });
  });

  describe('login', () => {
    it('should set the authenticated status to true and store the token in local storage', (done) => {
      const localStorageSpy = jest.spyOn(
        window.localStorage.__proto__,
        'setItem'
      );
      authService.authenticate(authTestingHelpers.validJwt);
      expect(localStorageSpy).toHaveBeenCalledWith(
        authConstants.authTokenName,
        authTestingHelpers.validJwt
      );
      authService.isAuthenticated$.subscribe((isAuthenticated) => {
        expect(isAuthenticated).toEqual(true);
        done();
      });
    });
  });

  describe('logout', () => {
    it('should set the authenticated status to false, clear the local storage and cache', (done) => {
      const localStorageSpy = jest.spyOn(
        window.localStorage.__proto__,
        'removeItem'
      );
      const apolloStopSpy = jest.spyOn(apollo.client, 'stop');
      const apolloClearStoreSpy = jest.spyOn(apollo.client, 'clearStore');
      authService.logout();
      expect(localStorageSpy).toHaveBeenCalledWith(authConstants.authTokenName);
      expect(apolloStopSpy).toHaveBeenCalled();
      expect(apolloClearStoreSpy).toHaveBeenCalled();
      authService.isAuthenticated$.subscribe((isAuthenticated) => {
        expect(isAuthenticated).toEqual(false);
        done();
      });
    });
  });
});
