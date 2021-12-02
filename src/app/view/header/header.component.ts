import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SfrAuthService } from '@sfr/shared/utils/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'sfr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrHeaderComponent {
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated$;

  constructor(private authService: SfrAuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['welcome']);
  }
}
