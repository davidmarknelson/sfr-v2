import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { SfrPaginationService } from './pagination.service';

describe('SfrPaginationService', () => {
  let service: SfrPaginationService;
  let ActivatedRouteMock: {
    queryParamMap: Observable<{
      page?: any;
    }>;
  } = {
    queryParamMap: of({ page: '5' }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: ActivatedRouteMock,
        },
      ],
    }).compileComponents();
    service = TestBed.inject<SfrPaginationService>(SfrPaginationService);
  });

  describe('getPageFromRoute$', () => {
    it('should return 5 when the query param page value is 5', () => {
      service.getPageFromRoute$.subscribe((page) => {
        expect(page).toEqual(5);
      });
    });

    it('should return 1 when there are no query params', () => {
      ActivatedRouteMock = { queryParamMap: of({}) };
      service.getPageFromRoute$.subscribe((page) => {
        expect(page).toEqual(1);
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
