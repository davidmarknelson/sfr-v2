import { TestBed } from '@angular/core/testing';
import { SfrAuthService } from './auth.service';

describe('AuthService', () => {
  let service: SfrAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SfrAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
