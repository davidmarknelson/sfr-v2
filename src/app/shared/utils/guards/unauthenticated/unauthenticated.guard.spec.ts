import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SfrAuthService } from '../../services';
import { SfrUnauthenticatedGuard } from './unauthenticated.guard';

let authState: boolean = true;
class MockAuthService {
  get isAuthenticated$() {
    return of(authState);
  }
}

describe('SfrUnauthenticatedGuard', () => {
  let guard: SfrUnauthenticatedGuard;
  let service: SfrAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SfrAuthService,
          useClass: MockAuthService,
        },
      ],
    });
    guard = TestBed.inject(SfrUnauthenticatedGuard);
    service = TestBed.inject(SfrAuthService);
  });

  it('should return false if the user is authenticated', (done) => {
    const spy = jest.spyOn(service, 'isAuthenticated$', 'get');
    guard.canActivate().subscribe((result) => {
      expect(result).toEqual(false);
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  it('should return true if the user is unauthenticated', (done) => {
    authState = false;
    const spy = jest.spyOn(service, 'isAuthenticated$', 'get');
    guard.canActivate().subscribe((result) => {
      expect(result).toEqual(true);
      expect(spy).toHaveBeenCalled();
      done();
    });
  });
});
