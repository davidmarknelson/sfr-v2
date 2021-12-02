import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SfrAuthService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class SfrUnauthenticatedGuard implements CanActivate {
  constructor(private authService: SfrAuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      map((isAuthenticated) => !isAuthenticated)
    );
  }
}
