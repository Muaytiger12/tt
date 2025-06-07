import { Component, input } from '@angular/core';

import { Profile } from 'profile';
import { AvatarCircleComponent } from 'common-ui';





@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-chat-workspace-header',
  imports: [AvatarCircleComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>();
}
