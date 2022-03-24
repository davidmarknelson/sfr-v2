import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileGQL, ProfileQuery } from '@sfr/data-access/generated';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sfr-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrProfileComponent {
  profile$: Observable<ProfileQuery['profile']>;

  constructor(private readonly profileGQL: ProfileGQL) {
    this.profile$ = this.profileGQL
      .fetch()
      .pipe(map(({ data }) => data.profile));
  }
}
