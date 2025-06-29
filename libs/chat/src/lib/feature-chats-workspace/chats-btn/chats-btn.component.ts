import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { AvatarCircleComponent } from 'common-ui';
import { LastMessageRes } from 'data-access';


@Component({

  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[chats]',
  imports: [AvatarCircleComponent],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsBtnComponent {
  chat = input<LastMessageRes>();
}
