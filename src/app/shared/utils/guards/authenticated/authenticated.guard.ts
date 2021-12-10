import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { SfrAuthService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class SfrAuthenticatedGuard implements CanActivate {
  constructor(private authService: SfrAuthService) {}
  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$;
  }
}
