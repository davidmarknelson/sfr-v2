import { of } from 'rxjs';

export class MockAuthService {
  get isAuthenticated$() {
    return of(false);
  }
  getTokenPayload() {
    return null;
  }
  authenticate() {
    return;
  }
  logout() {
    return;
  }
}
