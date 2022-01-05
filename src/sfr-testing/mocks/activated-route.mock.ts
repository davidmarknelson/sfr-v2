import { paramMapDefault } from '@sfr-testing/mock-helpers';
import { of } from 'rxjs';

export class MockActivateRoute {
  get queryParamMap() {
    return of({
      get: () => null,
    });
  }
  get paramMap() {
    return of(paramMapDefault);
  }
  get data() {
    return of(null);
  }
  snapshot = {};
}
