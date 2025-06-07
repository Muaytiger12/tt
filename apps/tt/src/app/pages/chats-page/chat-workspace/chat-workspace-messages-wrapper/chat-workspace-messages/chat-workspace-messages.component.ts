import { Component, HostBinding, input } from '@angular/core';
import { Message } from '../../../../../data/interfaces/chats.interface';
import { AvatarCircleComponent } from '../../../../../../../../../libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { toArray } from 'rxjs';

@Component({
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
