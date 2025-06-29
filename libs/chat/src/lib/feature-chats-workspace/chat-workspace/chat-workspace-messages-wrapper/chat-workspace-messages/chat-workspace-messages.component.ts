import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

import { DatePipe } from '@angular/common';

import { AvatarCircleComponent } from 'common-ui';
import { Message } from 'data-access';

@Component({
  selector: 'lib-chat-workspace-messages',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-messages.component.html',
  styleUrl: './chat-workspace-messages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceMessagesComponent {
  message = input.required<Message | any>();


  // @HostBinding('class.is-mine')
  //   get isMine(){
  //   return this.message().isMine
  // }
}
