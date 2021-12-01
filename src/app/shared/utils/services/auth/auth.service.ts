import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RefreshTokenGQL } from '@sfr/data-access/generated';
import { Apollo } from 'apollo-angular';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { authConstants } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class SfrAuthService {
  private jwtHelper = new JwtHelperService();
  private isAuthenticatedSubj$: Subject<boolean> = new Subject<boolean>();
  get isAuthenticated$() {
    return this.isAuthenticatedSubj$.asObservable();
  }

  constructor(
    private apollo: Apollo,
    private refreshTokenGQL: RefreshTokenGQL
  ) {}

  refreshOrClearToken$(): Observable<string | null> {
    if (this.isTokenValid()) {
      return this.refreshTokenGQL
        .fetch()
        .pipe(map(({ data }) => data.refreshToken.accessToken));
    } else {
      localStorage.removeItem(authConstants.authTokenName);
      return of(null);
    }
  }

  isTokenValid(): boolean {
    return !this.jwtHelper.isTokenExpired(
      localStorage.getItem(authConstants.authTokenName)!
    );
  }

  signin(token: string): void {
    localStorage.setItem(authConstants.authTokenName, token);
    this.isAuthenticatedSubj$.next(true);
  }

  logout(): void {
    localStorage.removeItem(authConstants.authTokenName);
    this.apollo.client.stop();
    this.apollo.client.clearStore();
  }
}
