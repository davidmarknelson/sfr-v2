import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SfrPaginationService } from './pagination.service';

let pageObj: { page?: string } = { page: '5' };

class MockActivateRoute {
  get queryParamMap() {
    return of(pageObj);
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
    it('should return 5 when the query param page value is 5', () => {
      const spy = jest.spyOn(activatedRoute, 'queryParamMap', 'get');
      service.getPageFromRoute$.subscribe((page) => {
        expect(page).toEqual(5);
      });
      expect(spy).toHaveBeenCalled();
    });

    it('should return 1 when there are no query params', () => {
      const spy = jest.spyOn(activatedRoute, 'queryParamMap', 'get');
      pageObj = {};
      service.getPageFromRoute$.subscribe((page) => {
        expect(page).toEqual(1);
      });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getSkip', () => {
    it('should return the skip value for pagination', () => {
      expect(service.getSkip(1)).toEqual(0);
      expect(service.getSkip(2)).toEqual(9);
    });
  });
});
