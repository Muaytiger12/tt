import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { AvatarCircleComponent } from 'common-ui';
import { Profile } from 'data-access';

@Component({
  selector: 'lib-profile-header',
  imports: [ AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
