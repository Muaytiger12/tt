import { Component, HostBinding, input } from '@angular/core';

import { DatePipe } from '@angular/common';

import { Message } from '../../../../data/interfaces/chats.interface';
import { AvatarCircleComponent } from 'common-ui';



@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-chat-workspace-messages',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-messages.component.html',
  styleUrl: './chat-workspace-messages.component.scss',
})
export class ChatWorkspaceMessagesComponent {
  message = input.required<Message | any>();

  ngOnInit() {
    console.log(this.message());
  }

  // @HostBinding('class.is-mine')
  //   get isMine(){
  //   return this.message().isMine
  // }
}
