import {
  AfterViewInit, ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ChatWorkspaceMessagesComponent } from './chat-workspace-messages/chat-workspace-messages.component';

import {
  BehaviorSubject,
  debounceTime,
  fromEvent,
  Subscription, switchMap,timer
} from 'rxjs';

import { DateTime } from 'luxon';
import { KeyValuePipe, NgFor } from '@angular/common';
import { MessageInputComponent } from '../../../ui/message-input/message-input.component';
import { Chat, ChatsService, Message } from 'data-access';
@Component({
  selector: 'lib-chat-workspace-messages-wrapper',
  imports: [
    ChatWorkspaceMessagesComponent,
    MessageInputComponent,
    NgFor,
    KeyValuePipe,
  ],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceMessagesWrapperComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  chatsService = inject(ChatsService);
  chat = input.required<Chat>();
  messages = this.chatsService.activeChatMessages;
  private resizeSub = new Subscription();
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  private pollingSub!: Subscription;
  res = new BehaviorSubject(this.groupByDate());

  ngOnInit() {
    this.pollingSub = timer(0, 10000)
      .pipe(
        switchMap(() => {
          // Послали запрос на отрисовку
          return this.chatsService.getChatById(this.chat().id)
        })
      )
      .subscribe({
        next: (data) => {
          this.messages.set(data.messages);
        },
        error: (err) => {
          console.error('Ошибка при получении сообщений', err);
        },
      });
    this.groupByDate();
  }

  ngAfterViewInit() {
    this.resizeFeed();

    this.resizeSub = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => this.resizeFeed());
  }

  ngOnDestroy() {
    this.resizeSub.unsubscribe();
    this.pollingSub.unsubscribe();
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 30;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  async onSendMessage(message: string) {

    this.chatsService.wsAdapter.sendMessage(message,this.chat().id)

  }

  groupByDate() {
    const messagesStart = this.messages();
    const messagesResult: any = [];

    const today = DateTime.now().startOf('day');
    const yesterday = today.minus({ days: 1 });

    messagesStart.forEach((message) => {
      const messageDate = DateTime.fromISO(message.createdAt, { zone: 'utc' })
        .setZone(DateTime.local().zone)
        .startOf('day');

      let date: any;
      if (messageDate.equals(today)) {
        date = 'Сегодня';
      } else if (messageDate.equals(yesterday)) {
        date = 'Вчера';
      } else {
        date = messageDate.toFormat('dd.MM.yyyy');
      }

      if (!messagesResult[date]) {
        messagesResult[date] = [];
      }
      messagesResult[date].push(message);
    });

    return messagesResult as [string, Message][];
  }
}
