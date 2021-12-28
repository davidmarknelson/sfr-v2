import { TestBed } from '@angular/core/testing';
import { MockAuthService } from '@sfr-testing/mocks';
import { of } from 'rxjs';
import { SfrAuthService } from '../../services';
import { SfrAuthenticatedGuard } from './authenticated.guard';

describe('SfrAuthenticatedGuard', () => {
  let guard: SfrAuthenticatedGuard;
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
    guard = TestBed.inject(SfrAuthenticatedGuard);
    service = TestBed.inject(SfrAuthService);
  });

  it('should return true if the user is authenticated', (done) => {
    const spy = jest
      .spyOn(service, 'isAuthenticated$', 'get')
      .mockReturnValue(of(true));
    guard.canActivate().subscribe((result) => {
      expect(result).toEqual(true);
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  it('should return false if the user is unauthenticated', (done) => {
    const spy = jest.spyOn(service, 'isAuthenticated$', 'get');
    guard.canActivate().subscribe((result) => {
      expect(result).toEqual(false);
      expect(spy).toHaveBeenCalled();
      done();
    });
  });
});
