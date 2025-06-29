import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { AvatarCircleComponent } from 'common-ui';
import { Profile } from 'data-access';

@Component({

  selector: 'lib-chat-workspace-header',
  imports: [AvatarCircleComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>();
}
