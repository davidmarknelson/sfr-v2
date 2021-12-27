import { of } from 'rxjs';

export class MockAuthService {
  get isAuthenticated$() {
    return of(true);
  }
  getTokenPayload() {
    return { username: 'some-user', sub: 1, iat: 12345, exp: 12345 };
  }
  authenticate() {
    return;
  }
  logout() {
    return;
  }
}
