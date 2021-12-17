import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RefreshTokenGQL } from '@sfr/data-access/generated';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map, shareReplay, tap } from 'rxjs/operators';
import { authConstants } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class SfrAuthService {
  private isAuthenticatedSubj$: BehaviorSubject<boolean | null> =
    new BehaviorSubject<boolean | null>(null);
  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubj$.asObservable().pipe(
      filter((isAuthenticated) => isAuthenticated !== null),
      shareReplay({ bufferSize: 1, refCount: true })
      // The type is overridden because the null is filtered out
    ) as unknown as Observable<boolean>;
  }

  constructor(
    private apollo: Apollo,
    private refreshTokenGQL: RefreshTokenGQL,
    private jwtHelper: JwtHelperService
  ) {}

  refreshOrClearToken$(): Observable<string | null> {
    if (!this.isTokenExpired()) {
      return this.refreshTokenGQL
        .fetch(
          {},
          {
            fetchPolicy: 'no-cache',
          }
        )
        .pipe(
          map(({ data }) => data.refreshToken.accessToken),
          tap((accessToken) => {
            this.authenticate(accessToken);
          }),
          catchError(() => {
            this.clearAuthState();
            return of(null);
          })
        );
    } else {
      this.clearAuthState();
      return of(null);
    }
  }

  getTokenPayload(): {
    username: string;
    sub: number;
    iat: number;
    exp: number;
  } | null {
    return this.jwtHelper.decodeToken(this.jwtHelper.tokenGetter());
  }

  isTokenExpired(): boolean {
    return this.jwtHelper.isTokenExpired(this.jwtHelper.tokenGetter());
  }

  authenticate(token: string): void {
    localStorage.setItem(authConstants.authTokenName, token);
    this.isAuthenticatedSubj$.next(true);
  }

  logout(): void {
    this.clearAuthState();
    this.apollo.client.stop();
    this.apollo.client.clearStore();
  }

  private clearAuthState(): void {
    localStorage.removeItem(authConstants.authTokenName);
    this.isAuthenticatedSubj$.next(false);
  }
}
