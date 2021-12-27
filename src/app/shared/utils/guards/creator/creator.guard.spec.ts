import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { MockAuthService } from '@sfr-testing/mocks';
import { RecipeGQL } from '@sfr/data-access/generated';
import { of } from 'rxjs';
import { SfrAuthService } from '../../services';
import { SfrCreatorGuard } from './creator.guard';

const routeParam = {
  paramMap: {
    get: jest.fn().mockReturnValue('some-recipe'),
  },
} as unknown as ActivatedRouteSnapshot;

describe('SfrCreatorGuard', () => {
  let guard: SfrCreatorGuard;
  let service: SfrAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SfrAuthService,
          useClass: MockAuthService,
        },
        {
          provide: RecipeGQL,
          useValue: {
            fetch: () =>
              of({
                data: {
                  recipe: { creator: { id: 1 } },
                },
              }),
          },
        },
      ],
    });
    guard = TestBed.inject(SfrCreatorGuard);
    service = TestBed.inject(SfrAuthService);
  });

  it('should return true if the user is the creator', (done) => {
    const spy = jest.spyOn(service, 'getTokenPayload');
    guard.canActivate(routeParam).subscribe((result) => {
      expect(result).toEqual(true);
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  it('should return false if the user is not the creator', (done) => {
    const spy = jest
      .spyOn(service, 'getTokenPayload')
      .mockReturnValue({
        username: 'some-user',
        sub: 2,
        iat: 12345,
        exp: 12345,
      });
    guard.canActivate(routeParam).subscribe((result) => {
      expect(result).toEqual(false);
      expect(spy).toHaveBeenCalled();
      done();
    });
  });
});
