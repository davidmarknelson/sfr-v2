import { TestBed } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { authTestingHelpers } from '@sfr-testing/helpers';
import { MockApollo } from '@sfr-testing/mocks';
import { RefreshTokenGQL } from '@sfr/data-access/generated';
import { Apollo } from 'apollo-angular';
import { of, throwError } from 'rxjs';
import { authConstants } from '../../constants';
import { SfrAuthService } from './auth.service';

let refreshTokenGqlReturn: any = of({
  data: { refreshToken: { accessToken: 'token' } },
});

const decodedToken = {
  exp: 1638567766,
  iat: 1516239022,
  name: 'John Doe',
  sub: '1234567890',
};

describe('AuthService', () => {
  let authService: SfrAuthService;
  let jwtService: JwtHelperService;
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
          useClass: MockApollo,
        },
        {
          provide: JwtHelperService,
          useValue: {
            isTokenExpired: jest.fn().mockReturnValue(true),
            tokenGetter: jest.fn().mockReturnValue('token'),
            decodeToken: jest.fn().mockReturnValue(decodedToken),
          },
        },
      ],
    });
    authService = TestBed.inject(SfrAuthService);
    jwtService = TestBed.inject(JwtHelperService);
    apollo = TestBed.inject(Apollo);
  });

  describe('refreshOrClearToken$', () => {
    it('should refresh the token and login the user', (done) => {
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
    it('should return false with a token that is not expired', () => {
      const tokenGetterSpy = jest
        .spyOn(jwtService, 'tokenGetter')
        .mockReturnValue(authTestingHelpers.validJwt);
      const isTokenExpiredSpy = jest
        .spyOn(jwtService, 'isTokenExpired')
        .mockReturnValue(false);
      const validToken = authService.isTokenExpired();
      expect(validToken).toEqual(false);
      expect(tokenGetterSpy).toHaveBeenCalled();
      expect(isTokenExpiredSpy).toHaveBeenCalled();
    });

    it('should return true with an expired token', () => {
      const tokenGetterSpy = jest
        .spyOn(jwtService, 'tokenGetter')
        .mockReturnValue(authTestingHelpers.expiredJwt);
      const isTokenExpiredSpy = jest
        .spyOn(jwtService, 'isTokenExpired')
        .mockReturnValue(true);
      const validToken = authService.isTokenExpired();
      expect(validToken).toEqual(true);
      expect(tokenGetterSpy).toHaveBeenCalled();
      expect(isTokenExpiredSpy).toHaveBeenCalled();
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

  describe('getTokenPayload', () => {
    it('should return a decoded token', () => {
      const tokenGetterSpy = jest
        .spyOn(jwtService, 'tokenGetter')
        .mockReturnValue(authTestingHelpers.expiredJwt);
      const decodeTokenSpy = jest.spyOn(jwtService, 'decodeToken');
      const decodedTokenPayload = authService.getTokenPayload();
      expect(tokenGetterSpy).toHaveBeenCalled();
      expect(decodeTokenSpy).toHaveBeenCalled();
      expect(decodedTokenPayload).toEqual(decodedToken);
    });

    it('should return null if there is no token', () => {
      const tokenGetterSpy = jest.spyOn(jwtService, 'tokenGetter');
      const decodeTokenSpy = jest
        .spyOn(jwtService, 'decodeToken')
        .mockReturnValue(null);
      const decodedTokenPayload = authService.getTokenPayload();
      expect(tokenGetterSpy).toHaveBeenCalled();
      expect(decodeTokenSpy).toHaveBeenCalled();
      expect(decodedTokenPayload).toEqual(null);
    });
  });
});
