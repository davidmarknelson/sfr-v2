import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SfrPaginationService } from './pagination.service';

let page: string | null = '5';
class MockActivateRoute {
  get queryParamMap() {
    return of({
      get: () => page,
    });
  }
}

describe('SfrPaginationService', () => {
  let service: SfrPaginationService;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: MockActivateRoute,
        },
      ],
    }).compileComponents();
    service = TestBed.inject<SfrPaginationService>(SfrPaginationService);
    activatedRoute = TestBed.inject<ActivatedRoute>(ActivatedRoute);
  });

  describe('getPageFromRoute$', () => {
    it('should return 5 when the query param page value is 5', (done) => {
      const spy = jest.spyOn(activatedRoute, 'queryParamMap', 'get');
      service.getPageFromRoute$.subscribe((page) => {
        expect(page).toEqual(5);
        expect(spy).toHaveBeenCalled();
        done();
      });
    });

    it('should return 1 when there are no query params', (done) => {
      const spy = jest.spyOn(activatedRoute, 'queryParamMap', 'get');
      page = null;
      service.getPageFromRoute$.subscribe((page) => {
        expect(page).toEqual(1);
        expect(spy).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('getSkip', () => {
    it('should return the skip value for pagination', () => {
      expect(service.getSkip(1)).toEqual(0);
      expect(service.getSkip(2)).toEqual(9);
    });
  });
});
