import { Component, Input } from '@angular/core';

import { ImgUrlPipe } from 'common-ui';
import { Profile } from 'data-access';


@Component({
  selector: 'lib-profile-card',
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
