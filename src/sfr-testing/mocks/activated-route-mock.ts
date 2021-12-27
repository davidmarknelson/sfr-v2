import { of } from 'rxjs';

export class MockActivateRoute {
  get queryParamMap() {
    return of({
      get: () => '2',
    });
  }
}
