import { of } from 'rxjs';

export class MockActivateRoute {
  get queryParamMap() {
    return of({
      get: () => null,
    });
  }
  get paramMap() {
    return of({
      get: () => null,
    });
  }
  get data() {
    return of(null);
  }
  snapshot = {};
}
