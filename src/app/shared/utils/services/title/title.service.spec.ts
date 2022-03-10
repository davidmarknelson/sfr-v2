import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';
import { MockActivatedRoute, MockRouter, MockTitle } from '@sfr-testing/mocks';
import { of } from 'rxjs';
import { SfrTitleService } from './title.service';

describe('TitleService', () => {
  let service: SfrTitleService;
  let title: Title;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useClass: MockRouter,
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute,
        },
        {
          provide: Title,
          useClass: MockTitle,
        },
      ],
    });
    service = TestBed.inject(SfrTitleService);
    title = TestBed.inject(Title);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setTabTitle', () => {
    it('should call the Angular title service', () => {
      const titleSpy = jest.spyOn(title, 'setTitle');
      service.setTabTitle('title');
      expect(titleSpy).toHaveBeenCalledWith('title | Share Family Recipes');
    });
  });

  describe('setTabTitles', () => {
    it('should call setTabTitle if there is a title property in the route data object', () => {
      const routerSpy = jest
        .spyOn(router, 'events', 'get')
        .mockReturnValue(
          of(
            new NavigationEnd(
              0,
              'http://localhost:4200/login',
              'http://localhost:4200/login'
            )
          )
        );
      const setTabTitleSpy = jest.spyOn(service, 'setTabTitle');
      jest.spyOn(route, 'snapshot', 'get').mockReturnValue({
        data: {
          title: 'some-title',
        },
      } as unknown as ActivatedRouteSnapshot);
      service.setTabTitles();
      expect(routerSpy).toHaveBeenCalled();
      expect(setTabTitleSpy).toHaveBeenCalledWith('some-title');
    });

    it('should call setTabTitle if there is a title property in the route first child data object', () => {
      const routerSpy = jest
        .spyOn(router, 'events', 'get')
        .mockReturnValue(
          of(
            new NavigationEnd(
              0,
              'http://localhost:4200/login',
              'http://localhost:4200/login'
            )
          )
        );
      const setTabTitleSpy = jest.spyOn(service, 'setTabTitle');
      jest.spyOn(route, 'snapshot', 'get').mockReturnValue({
        firstChild: {
          data: {
            title: 'some-title',
          },
        },
        // data defaults to an empty object so we must add it to the test
        data: {},
      } as unknown as ActivatedRouteSnapshot);
      service.setTabTitles();
      expect(routerSpy).toHaveBeenCalled();
      expect(setTabTitleSpy).toHaveBeenCalledWith('some-title');
    });

    it('should not call setTabTitle if there is a title property in the route data object', () => {
      const routerSpy = jest
        .spyOn(router, 'events', 'get')
        .mockReturnValue(
          of(
            new NavigationEnd(
              0,
              'http://localhost:4200/login',
              'http://localhost:4200/login'
            )
          )
        );
      const setTabTitleSpy = jest.spyOn(service, 'setTabTitle');
      jest.spyOn(route, 'snapshot', 'get').mockReturnValue({
        data: {},
      } as unknown as ActivatedRouteSnapshot);
      service.setTabTitles();
      expect(routerSpy).toHaveBeenCalled();
      expect(setTabTitleSpy).not.toHaveBeenCalled();
    });
  });
});
