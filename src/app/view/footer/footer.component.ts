import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SfrAuthService } from '@sfr/shared/utils/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'sfr-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrFooterComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(private readonly auth: SfrAuthService) {
    this.isAuthenticated$ = this.auth.isAuthenticated$;
  }
}
